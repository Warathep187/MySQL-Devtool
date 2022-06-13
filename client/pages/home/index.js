import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Table from "../../components/Table";
import axios from "axios";
import Link from "next/link";
import {useRouter} from "next/router";

const Home = () => {
    const router = useRouter();
    const [tables, setTables] = useState([]);
    const [selectedTable, setSelectedTable] = useState("");

    const fetchTablesHandler = async () => {
        try {
            const { data } = await axios.get("http://localhost:800/api/mysql/tables");
            setTables(data.tables);
            setSelectedTable("");
        } catch (e) {
            alert(e.response.data.message);
            router.replace("/");
        }
    };

    useEffect(async () => {
        fetchTablesHandler();
    }, []);

    return (
        <Container fluid>
            <Row>
                <Col md={2}>
                    <p className="display-5">{tables.length} Tables</p>
                    {tables.map((table, index) => {
                        return (
                            <div className="w-100" key={index}>
                                <Button
                                    variant="outline-primary"
                                    className="w-100 py-3"
                                    onClick={() => setSelectedTable(table[Object.keys(table)[0]])}
                                >
                                    {table[Object.keys(table)[0]]}
                                </Button>
                            </div>
                        );
                    })}
                    <div className="mt-2 d-flex justify-content-between">
                        <Link href="/">
                            <a style={{ cursor: "pointer" }}>⬅️ Back</a>
                        </Link>
                        <Button variant="outline-primary p-2" onClick={fetchTablesHandler}>🔃</Button>
                    </div>
                </Col>
                <Col md={10} className="mt-5">
                    <Table tableName={selectedTable} />
                </Col>
            </Row>
        </Container>
    );
};

export default Home;
