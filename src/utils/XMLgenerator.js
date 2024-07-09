export function generateXML(nodes, edges, panelState) {

  return `<?xml version="1.0" encoding="UTF-8"?>
<api-rest-model xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi:noNamespaceSchemaLocation="schema.xsd">

<psm-model>
    <so so-name="${panelState.selectedOS}"/>
    <technology tech-name="${panelState.selectedTech}" version="0.0.0" port="${panelState.port}"/>
    <project name="${panelState.projectName}"/>
  </psm-model>

  <csm-model>
    <login has="${panelState.loginRequired.toLowerCase()}">
    </login>
  </csm-model>

  <relational-model>
  ${nodes.map(table =>
    `<table name="${table.data.headerValue}">
      <attributes>
        ${generateAttribute(table)}
      </attributes>


      ${generateRelation(edges, table.id)}

    </table>
    `
  ).join('\n')}
  </relational-model>
</api-rest-model>
`
}

function generateAttribute(table) {
  return table.data.rows.slice(1).map(row =>
    `<attribute data-type="${row[2].value}" name="${row[1].value}" ${row[0].value === "PK" ? "PK=\"true\"" : ""}/>`
  ).join('\n        ')
}

export function generateRelation(edges, id) {

  const foundEdges = edges.filter(edge => edge.target === id);
  console.log(foundEdges)

  // <relations>

  //   <relation multiplicity="1:n" table="CLIENTE" attribute="ID_CLIENTE" />
  // </relations>
  // return
}

