import React from "react";

const TableStructure = ({ desc }) => {
    return (
        <div className="text-break mb-3">
            {desc.map((field, index) => (
                <p className="my-1" key={index}>{JSON.stringify(field)}</p>
            ))}
        </div>
    );
};

export default TableStructure;
