import React, { useLayoutEffect, useRef, useEffect } from "react";
import { OrgChart } from "d3-org-chart";

export const Org2ChartComponent = (props, ref) => {
    const d3Container = useRef(null);

    return (
        <div>
            <div ref={d3Container} />
        </div>
    );
};
