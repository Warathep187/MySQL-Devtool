import { useState } from "react";
import { Container, Form, Button, Display, Alert } from "react-bootstrap";
import axios from "axios";
import { useRouter } from "next/router";

function Home() {
    const router = useRouter();
    const [text, setText] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const connectDatabaseHandler = async (e) => {
        e.preventDefault();
        if (text.trim() === "") {
            return alert("โปรดกรอกชื่อฐานข้อมูลด้วย");
        }
        try {
            const { data } = await axios.post("http://localhost:80/api/create-connection", {
                database: text,
            });
            alert(data.message);
            router.push("/home");
        } catch (e) {
            alert(e.response.data.message);
        }
        setIsLoading(false);
    };

    return (
        <Container>
            <div className="w-50 mx-auto">
                <p className="display-4">Select Database</p>
                <Form onSubmit={connectDatabaseHandler}>
                    <Form.Group>
                        <Form.Label>Database Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter database name"
                            onChange={(e) => setText(e.target.value)}
                        />
                    </Form.Group>
                    <div className="w-100 text-end mt-2">
                        <Button
                            variant="outline-primary"
                            type="submit"
                            className="px-4"
                            disabled={isLoading || text.trim() === ""}
                        >
                            {isLoading ? "Connecting" : "Connect"}
                        </Button>
                    </div>
                </Form>
            </div>
            <div className="w-50 mx-auto mt-4">
                <p className="text-muted fst-italic">Created by Warathep</p>
            </div>
        </Container>
    );
}

export default Home;
