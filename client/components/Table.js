import { useState, useEffect } from "react";
import { Table, Modal, Button } from "react-bootstrap";
import axios from "axios";

const DatabaseTable = ({ tableName }) => {
    const [header, setHeader] = useState([]);
    const [data, setData] = useState([]);
    const [length, setLength] = useState(0);

    const [isShowModal, setIsShowModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState(0);

    const fetchDataHandler = async () => {
        if (tableName !== "") {
            try {
                const { data } = await axios.get(`http://localhost:80/api/table/${tableName}`);
                setData(data.data);
                setHeader(data.desc);
                setLength(data.data_length);
            } catch (e) {
                alert(e.response.data.message);
            }
        }
    };

    useEffect(async () => {
        fetchDataHandler();
    }, [tableName]);

    const setColumnFuncHandler = (col, rowIndex, colIndex) => {
        const text = col.length > 18 ? col.substring(0, 16) + ".." : col;
        return (
            <td
                onClick={() => {
                    setSelectedRow(rowIndex);
                    setIsShowModal(true);
                }}
                key={colIndex}
            >
                {text}
            </td>
        );
    };

    return (
        <div className="mt-4">
            <div className="w-100">
                <Modal show={isShowModal} onHide={() => {
                    setSelectedRow(0);
                    setIsShowModal(false);
                }}>
                    <Modal.Header closeButton>
                        <Modal.Title>{tableName}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {header.length > 0 && data.length > 0 && (
                            <div className="w-100 text-break">
                                {header.map((row, index) => (
                                    <div key={index} className="mb-2">
                                        <p className="fs-5 fw-bold mb-1">{row.Field}</p>
                                        <textarea
                                            cols="30"
                                            rows="2"
                                            className="form-control"
                                            defaultValue={data[selectedRow][row.Field]}
                                            readOnly
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </Modal.Body>
                </Modal>
                {tableName === "" ? (
                    <p className="fw-bold mx-auto">Please select table</p>
                ) : (
                    <>
                        <div className="d-flex justify-content-between align-items-center mb-1">
                            <p className="fw-bold">{length} Rows</p>
                            <Button variant="outline-primary p-2" onClick={fetchDataHandler}>
                                🔃
                            </Button>
                        </div>
                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    {header.map((head, index) => (
                                        <th key={index}>{head.Field}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((row, index) => (
                                    <tr key={index}>
                                        {Object.keys(row).map((col, i) =>
                                            setColumnFuncHandler(row[Object.keys(row)[i]], index, i)
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </>
                )}
            </div>
        </div>
    );
};

export default DatabaseTable;
