import React, { useLayoutEffect, useRef, useEffect } from "react";
import { OrgChart } from "d3-org-chart";

export const OrgChartComponent = (props, ref) => {
    const d3Container = useRef(null);
    let chart = null;

    function addNode(node) {
        chart.addNode(node);
    }

    props.setClick(addNode);

    // We need to manipulate DOM
    useLayoutEffect(() => {
        if (props.data && d3Container.current) {
            if (!chart) {
                chart = new OrgChart();
            }
            chart
                .container(d3Container.current)
                .data(props.data)
                // .nodeWidth((node) => 100)
                .nodeHeight((node) => 40)
                // .childrenMargin((d) => 10)
                .nodeContent((data) => {
                    const member = data.data;
                    return `<div class="bg-white border rounded-lg p-4">
                        ${member?.name}
                    </div>`;
                })
                .render();
        }
    }, [props.data, d3Container.current]);

    return (
        <div>
            <div ref={d3Container} />
        </div>
    );
};
