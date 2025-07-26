import React, { useEffect, useState } from "react";
import { CardSetType } from "../types";
import { CardType } from "../types";
import { Modal } from "@mui/base/Modal";
import CloseIcon from "@mui/icons-material/Close";
import Checkbox from "@mui/material/Checkbox";

const apiUrl = import.meta.env.VITE_YUGIOH_API_URL;

export const Cards = ({ cardDetails }: { cardDetails: CardType[] }) => {
  const [ownedCards, setOwnedCards] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [refetchOwnedCards, setRefetchOwnedCards] = useState<boolean>(true);

  useEffect(() => {
    const fetchOwnedCards = async () => {
      try {
        setLoading(true);

        const response = await fetch(`${apiUrl}/get-owned-cards`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: `${localStorage.getItem("email")}`,
          }),
        });

        const data = await response.json();
        setOwnedCards(data);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching owned cards:", error);
        setLoading(false);
        setOwnedCards([]);
      }
    };

    if (refetchOwnedCards) {
      fetchOwnedCards();
      setRefetchOwnedCards(false);
    }
  }, [refetchOwnedCards]);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "12px",
          marginBottom: "20px",
        }}
      >
        <button
          style={{
            padding: "8px 16px",
            backgroundColor: "#4F46E5",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            fontWeight: 600,
            cursor: "pointer",
            transition: "background-color 0.2s",
          }}
          onClick={() => {
            cardDetails.forEach((card) => {
              if (!ownedCards.includes(`${card.id}`)) {
                fetch(`${apiUrl}/add-owned-card`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    cardId: `${card.id}`,
                    userId: `${localStorage.getItem("email")}`,
                  }),
                });
              }
            });
            setRefetchOwnedCards(true);
          }}
        >
          Select All
        </button>

        <button
          style={{
            padding: "8px 16px",
            backgroundColor: "#ef4444",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            fontWeight: 600,
            cursor: "pointer",
            transition: "background-color 0.2s",
          }}
          onClick={() => {
            cardDetails.forEach((card) => {
              if (ownedCards.includes(`${card.id}`)) {
                fetch(`${apiUrl}/remove-owned-card`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    cardId: `${card.id}`,
                    userId: `${localStorage.getItem("email")}`,
                  }),
                });
              }
            });
            setRefetchOwnedCards(true);
          }}
        >
          Deselect All
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)", // FIXED: exactly 3 columns
          gap: "24px",
          padding: "10px",
        }}
      >
        {cardDetails.map((card) => (
          <Card
            key={card.id}
            card={card}
            ownedCards={ownedCards}
            setRefetchOwnedCards={setRefetchOwnedCards}
          />
        ))}
      </div>
    </>
  );
};

export const Card = ({
  card,
  ownedCards,
  setRefetchOwnedCards,
}: {
  card: CardType;
  ownedCards: string[];
  setRefetchOwnedCards: (value: boolean) => void;
}) => {
  const [cardSelected, setCardSelected] = React.useState<boolean>(false);
  const [checked, setChecked] = React.useState<boolean>(false);

  useEffect(() => {
    setChecked(ownedCards.includes(`${card.id}`));
  }, [ownedCards, card.id]);

  const handleCheckboxChange = (isChecked: boolean) => {
    if (isChecked) {
      fetch(`${apiUrl}/add-owned-card`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cardId: `${card.id}`,
          userId: `${localStorage.getItem("email")}`,
        }),
      });
      setRefetchOwnedCards(true);
    } else {
      fetch(`${apiUrl}/remove-owned-card`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cardId: `${card.id}`,
          userId: `${localStorage.getItem("email")}`,
        }),
      });
      setRefetchOwnedCards(true);
    }
  };

  return (
    <div
      style={{
        border: "1px solid #e5e7eb", // light gray
        borderRadius: "12px",
        padding: "20px",
        backgroundColor: "#ffffff", // white
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // soft shadow
        maxHeight: 500,
        overflowY: "auto",
        transition: "box-shadow 0.3s ease",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <div style={{ marginRight: "8px", fontWeight: 500, color: "#555" }}>
          Owned
        </div>
        <Checkbox
          onChange={(event) => {
            const isChecked = event.target.checked;
            handleCheckboxChange(isChecked);
            setChecked(isChecked);
          }}
          checked={checked}
        />
      </div>

      <h3
        style={{
          marginBottom: "8px",
          fontSize: "1.25rem",
          fontWeight: "600",
          color: "#1f2937", // dark gray
        }}
      >
        {card.name}
      </h3>

      <p
        style={{
          marginBottom: "12px",
          fontStyle: "italic",
          fontSize: "0.95rem",
          color: "#6b7280", // cool gray
        }}
      >
        {card.desc}
      </p>

      <div style={{ fontSize: "0.95rem", color: "#374151" }}>
        <div>
          <strong>Race:</strong> {card.race}
        </div>
        <div>
          <strong>Type:</strong> {card.type}
        </div>
        {card.archetype && (
          <div>
            <strong>Archetype:</strong> {card.archetype}
          </div>
        )}
        {card.attribute && (
          <div>
            <strong>Attribute:</strong> {card.attribute}
          </div>
        )}
        {card.level && (
          <div>
            <strong>Level:</strong> {card.level}
          </div>
        )}
        {(card.atk || card.atk === 0) && (
          <div>
            <strong>ATK:</strong> {card.atk}
          </div>
        )}
        {(card.def || card.def === 0) && (
          <div>
            <strong>DEF:</strong> {card.def}
          </div>
        )}
        {card.card_sets?.map((set: CardSetType) => (
          <div key={set.set_name}>
            <strong>Set:</strong> {set.set_name}
          </div>
        ))}
      </div>

      <button
        style={{
          marginTop: "auto",
          padding: "10px 16px",
          backgroundColor: "#6366f1", // indigo-500
          color: "#ffffff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "600",
          fontSize: "1rem",
          transition: "background-color 0.2s",
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#4f46e5")} // darker on hover
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#6366f1")}
        onClick={() => setCardSelected(true)}
      >
        View image
      </button>

      <Modal
        open={cardSelected}
        onClose={() => setCardSelected(false)}
        aria-labelledby="card-modal-title"
        aria-describedby="card-modal-description"
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "24px",
            width: "90%",
            maxWidth: "500px",
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
            textAlign: "center",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button
                onClick={() => setCardSelected(false)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#555",
                  fontSize: "1.5rem",
                }}
              >
                <CloseIcon />
              </button>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img
                src={card?.card_images?.[0]?.image_url}
                height={600}
                width={400}
                style={{ borderRadius: "8px" }}
                alt={card.name}
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};