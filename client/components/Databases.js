import { Button, Form } from "react-bootstrap";
import { useState } from "react";

const Databases = ({ databases, onSelectDatabaseHandler, isLoading }) => {
    const [selectedDatabase, setSelectedDatabase] = useState("");

    return (
        <div>
            {databases.map((database, index) => (
                <Form.Check
                    type="radio"
                    name="database"
                    onChange={(e) => setSelectedDatabase(e.target.value)}
                    label={database.Database}
                    value={database.Database}
                    key={index}
                />
            ))}
            <Button
                variant="outline-primary"
                onClick={() => onSelectDatabaseHandler(selectedDatabase)}
                disabled={isLoading}
                className="px-4 mt-3"
            >
                {isLoading ? "Selecting..." : "Select"}
            </Button>
        </div>
    );
};

export default Databases;
