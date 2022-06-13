import { useState, useEffect } from "react";
import { Container, Form, Button, Display, Alert } from "react-bootstrap";
import axios from "axios";
import { useRouter } from "next/router";
import Databases from "../components/Databases";

function Home() {
    const router = useRouter();
    const [databases, setDatabases] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const selectDatabaseHandler = async (selectedDatabase) => {
        setIsLoading(true);
        try {
            const { data } = await axios.post("http://localhost:800/api/mysql/databases/select", {
                database: selectedDatabase,
            });
            router.push("/home");
        } catch (e) {
            alert(e.response.data.message)
        }
        setIsLoading(false);
    };

    const fetchDatabasesHandler = async () => {
        try {
            const { data } = await axios.get("http://localhost:800/api/mysql/databases");
            setDatabases(data.databases);
        }catch(e) {
            alert(e.response.data.message);
        }
    }

    useEffect(() => {
        fetchDatabasesHandler();
    }, [])

    return (
        <Container>
            <div className="w-50 mx-auto">
                <p className="display-4 mx-auto">Select Database</p>
                <Databases databases={databases} onSelectDatabaseHandler={selectDatabaseHandler} isLoading={isLoading} />
            </div>
            <div className="w-50 mx-auto mt-4">
                <p className="text-muted fst-italic">Created by Warathep</p>
            </div>
        </Container>
    );
}

export default Home;
