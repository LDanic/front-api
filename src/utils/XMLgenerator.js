export function generateXML(nodes, edges, panelState) {
  const orderedNodes = nodes.sort((a, b) => {
    const foundEdgesA = edges.filter((edge) => edge.target === a.id);
    const foundEdgesB = edges.filter((edge) => edge.target === b.id);

    if (foundEdgesA.length > 0 && foundEdgesB.length === 0) {
      return -1;
    } else if (foundEdgesA.length === 0 && foundEdgesB.length > 0) {
      return 1;
    } else {
      return 0;
    }
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<api-rest-model xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi:noNamespaceSchemaLocation="schema.xsd">

<psm-model>
    <so so-name="${panelState.selectedOS.toUpperCase()}"/>
    <technology tech-name="${panelState.selectedTech.toUpperCase()}" version="0.0.0" port="${
    panelState.port
  }"/>
    <project name="${panelState.projectName}"/>
  </psm-model>

  <relational-model>
  ${orderedNodes
    .map(
      (table) =>
        `<table name="${table.data.headerValue}">
      <attributes>
        ${generateAttribute(table)}
      </attributes>


      ${generateRelation(edges, table.id, orderedNodes)}

    </table>
    `
    )
    .join("\n")}
  </relational-model>
</api-rest-model>
`;
}

function generateAttribute(table) {
  return table.data.rows
    .slice(1)
    .map(
      (row) =>
        `<attribute data-type="${row[2].value}" name="${
          row[1].value
        }" PK="${row[0].value.includes("PK")}" FK="${row[0].value.includes(
          "FK"
        )}" NN="${row[0].value.includes("NN")}" UQ="${row[0].value.includes(
          "UQ"
        )}" AI="${row[0].value.includes("AI")}" />`
    )
    .join("\n        ");
}

export function generateRelation(edges, id, nodes) {
  const foundEdges = edges.filter((edge) => edge.target === id);
  if (foundEdges.length > 0) {
    return `<relations>
${foundEdges
  .map((edge) => {
    let nodo_aux = nodes.find((node) => node.id == edge.source).data;
    return `              <relation multiplicity="${edge.data.label}" table="${
      nodo_aux.headerValue
    }" attribute="${nodo_aux.rows
      .map((row) => (row[0].value.includes("PK") ? row[1].value : ""))
      .join("")}" />`;
  })
  .join("\n")}
      </relations>
    `;
  }
  return "";

  // <relations>

  //   <relation multiplicity="1:n" table="CLIENTE" attribute="ID_CLIENTE" />
  // </relations>
  // return
}
