import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";

const OurStory = () => {
    const navigate = useNavigate();

    return (
        <div className="container mt-4 text-center">
            <h1>Sobre HamburEat</h1>
            <img
                style={{
                    height: "400px",
                    objectFit: "cover",
                }}
                src="https://devsapihub.com/img-fast-food/hamburguesas_06.jpg"
                alt=""
            />

            <p className="mt-3">
                HamburEat nace con la pasión por las hamburguesas de calidad,
                combinando sabor, rapidez y experiencia.
            </p>

            <Button variant="warning" onClick={() => navigate("/")}>
                Volver a página principal
            </Button>
        </div>
    );
};

export default OurStory;
