import styles from "./Card.module.scss";
import React from "react";
import { Button, DialogTrigger, Link } from "react-aria-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

import AriaModal from "../AriaModal/AriaModal";
import { deleteArticle } from "../../utils/strapi";
import { useRouter } from "next/router";

interface CardProps {
  imageUrl: string;
  title: string;
  description: string;
  isShowMoreVisible?: boolean;
  date?: string;
  isEditable?: boolean;
  slug?: string;
  id?: number;
}

const Card: React.FC<CardProps> = ({
  imageUrl,
  title,
  description,
  date,
  isEditable,
  slug,
  id,
}) => {
  const { push } = useRouter();

  const handleDelete = () => {
    deleteArticle(id).then(() => {
      push("/aktuelles");
    });
  };

  const linkProps = slug ? { href: `aktuelles/${slug}` } : "";

  return (
    <div className={styles.cardWrapper}>
      {isEditable && (
        <div className={styles.adminButtons}>
          <Link href={`/bearbeiten/${slug}`}>
            <FontAwesomeIcon icon={faPen} color="white" />
          </Link>
          <DialogTrigger>
            <Button>
              <FontAwesomeIcon icon={faTrash} color="white" />
            </Button>
            <AriaModal
              title={"Löschen bestätigen"}
              text={`Möchtest du wirklich den Artikel "${title}" löschen? Dieser Schritt kann nicht rückgängig gemacht werden!`}
              onConfirm={handleDelete}
            />
          </DialogTrigger>
        </div>
      )}
      <Link {...linkProps}>
        <div className={styles.card}>
          <img
            src={imageUrl}
            width={300}
            height={200}
            alt={`Bildvorschau für ${title}`}
            className={styles.image}
            loading="lazy"
          />
          <div className={styles.textContent}>
            <h3>{title}</h3>
            <p>{description}</p>
            {date && <p>{date.split("-").reverse().join(".")}</p>}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
