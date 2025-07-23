import styles from "./Card.module.scss";
import React from "react";

import { Button, DialogTrigger } from "react-aria-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

import AriaModal from "../AriaModal/AriaModal";
import { deleteArticle, SIZES_CARD } from "../../utils/strapi";
import { useRouter } from "next/router";
import Image from "next/image";
import { StrapiImage } from "../StrapiImage/StrapiImage";
import Link from "next/link";

interface CardProps {
  imageUrl?: string;
  title: string;
  description: string;
  isShowMoreVisible?: boolean;
  date?: string;
  isEditable?: boolean;
  href?: string;
  slug?: string;
  id?: number;
  image?: any;
  isDraft?: boolean;
}

const Card: React.FC<CardProps> = ({
  imageUrl,
  title,
  description,
  date,
  isEditable,
  href,
  slug,
  id,
  image,
  isDraft = false,
}) => {
  const ContentWrapperComponent = href ? Link : "div";

  const handleDelete = () => {
    deleteArticle(id).then(() => {
      window.location.reload();
    });
  };
  return (
    <div className={styles.cardWrapper}>
      {isEditable && (
        <div className={styles.adminButtons}>
          <Link href={`/zeitungsartikel?slug=${slug}`}>
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
            {isDraft && (
              <div className="bg-amber-50 w-fit px-4 py-2 rounded-md border border-amber-200 text-amber-800 absolute right-24">
                Entwurf
              </div>
            )}
          </DialogTrigger>
        </div>
      )}

      <ContentWrapperComponent className={styles.card} href={href}>
        {imageUrl && (
          <Image
            src={imageUrl}
            width={300}
            height={200}
            alt={`Bildvorschau für ${title}`}
            className={styles.image}
          />
        )}

        {image?.attributes && (
          <StrapiImage
            img={image}
            alt="Hinzugefügte Bilder"
            sizes={SIZES_CARD}
          />
        )}

        <div className={styles.textContent}>
          <h3>{title}</h3>
          <p>{description}</p>
          {date && <p>{date.split("-").reverse().join(".")}</p>}
        </div>
      </ContentWrapperComponent>
    </div>
  );
};

export default Card;
