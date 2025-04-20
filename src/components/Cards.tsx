import React, { useEffect, useState } from "react";
import { CardSetType } from "../types";
import { CardType } from "../types";
import { Modal } from "@mui/base/Modal";
import CloseIcon from "@mui/icons-material/Close";
import Checkbox from "@mui/material/Checkbox";

const apiUrl = import.meta.env.VITE_YUGIOH_API_URL;

export const Cards = ({ cardDetails }: { cardDetails: CardType[] }) => {
  const [ownedCards, setOwnedCards] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
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
            userId: "IqraLatif159@gmail.com", // whatever data you're sending
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
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: "16px",
      }}
    >
      {cardDetails.map((card) => {
        return (
          <Card
            key={card.id}
            card={card}
            ownedCards={ownedCards}
            setRefetchOwnedCards={setRefetchOwnedCards}
          />
        );
      })}
    </div>
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
  const [checked, setChecked] = React.useState<boolean>(
    false
  );

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
          userId: "IqraLatif159@gmail.com",
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
          userId: "IqraLatif159@gmail.com",
        }),
      });
      setRefetchOwnedCards(true);
    }
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "10px",
        padding: "16px",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        maxHeight: 500,
        overflowY: "scroll",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <div>Owned</div>
        <Checkbox
          onChange={(event) => {
            const isChecked = event.target.checked;
            handleCheckboxChange(isChecked);
            setChecked(isChecked);
          }}
          checked={checked}
        />
      </div>
      <h3 style={{ marginBottom: "8px", color: "#333" }}>{card.name}</h3>
      <p style={{ marginBottom: "8px", fontStyle: "italic", color: "#555" }}>
        {card.desc}
      </p>
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

      <button
        style={{
          marginTop: "12px",
          padding: "8px 16px",
          backgroundColor: "#4F46E5",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "500",
          transition: "background-color 0.2s ease-in-out",
        }}
        onClick={() => setCardSelected(true)}
      >
        Expand
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
            backgroundColor: "#fff",
            borderRadius: "10px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
            textAlign: "center",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "end" }}>
              <button
                onClick={() => setCardSelected(false)}
                style={{ marginTop: "16px" }}
              >
                <CloseIcon />
              </button>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img
                src={card?.card_images[0].image_url}
                height={600}
                width={400}
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
