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


      ${generateRelation(edges, table.id, nodes)}

    </table>
    `
  ).join('\n')}
  </relational-model>
</api-rest-model>
`
}

function generateAttribute(table) {
  return table.data.rows.slice(1).map(row =>
    `<attribute data-type="${row[2].value}" name="${row[1].value}" PK="${row[0].value.includes('PK')}" FK="${row[0].value.includes('FK')}" NN="${row[0].value.includes('NN')}" UQ="${row[0].value.includes('UQ')}" AI="${row[0].value.includes('AI')}" />`
  ).join('\n        ')
}

export function generateRelation(edges, id, nodes) {

  const foundEdges = edges.filter(edge => edge.target === id);
  if(foundEdges.length > 0){
    return `<relations>
              ${foundEdges.map(edge =>
                `<relation multiplicity="${edge.data.label}" table="${nodes.find(node => node.id == edge.source).data.headerValue }" attribute="ID_CLIENTE" />`
              ).join('\n')}
            </relations>
    `
  }

  // <relations>

  //   <relation multiplicity="1:n" table="CLIENTE" attribute="ID_CLIENTE" />
  // </relations>
  // return
}

