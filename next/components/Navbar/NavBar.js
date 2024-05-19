import Link from "next/link";
import styles from "./NavBar.module.scss";
import { Button, ListBox, ListBoxItem, Select } from "react-aria-components";
import { useFocus, useFocusWithin, useHover } from "react-aria";
import { useRef, useState } from "react";

const NavBar = () => {
  const vereinLinks = [
    { name: "Events", href: "/events" },
    { name: "Organisation", href: "/organisation" },
    { name: "Sponsoren", href: "/sponsoren" },
    { name: "Unsere Halle", href: "/halle" },
  ];

  const erwachseneLinks = [
    { name: "Training", href: "/erwachsene/training" },
    { name: "Mannschaften", href: "/erwachsene/mannschaften" },
  ];

  const jugendLinks = [
    { name: "Training", href: "/jugend/training" },
    { name: "Trainer", href: "/jugend/trainer" },
    { name: "Mannschaften", href: "/jugend/mannschaften" },
  ];

  const termineLinks = [
    { name: "Spiele", href: "/termine/spiele" },
    {
      name: "Feste und andere Termine",
      href: "/termine/feste-und-andere-termine",
    },
  ];

  const anderesLinks = [
    { name: "Links", href: "/links" },
    {
      name: "Downloads",
      href: "/downloads",
    },
    { name: "Impressum", href: "/impressum" },
    { name: "Datenschutz", href: "/datenschutz" },
    { name: "Kontakt", href: "/kontakt" },
  ];

  return (
    <div className={styles.navContainer}>
      <Link href={"/"} className={styles.link}>
        Start
      </Link>
      <LinkSelect options={vereinLinks} label={"Verein"} />
      <LinkSelect options={erwachseneLinks} label={"Erwachsene"} />
      <LinkSelect options={jugendLinks} label={"Jugend"} />
      <LinkSelect options={termineLinks} label={"Termine"} />
      <Link href={"/galerie"} className={styles.link}>
        Galerie
      </Link>
      <Link href={"/aktuelles"} className={styles.link}>
        Aktuelles
      </Link>
      <LinkSelect options={anderesLinks} label={"Anderes"} />
    </div>
  );
};

export default NavBar;

const LinkSelect = ({ options, label }) => {
  const [isOpen, setOpen] = useState(false);

  let { hoverProps } = useHover({
    onHoverChange: setOpen,
  });

  let { focusWithinProps } = useFocusWithin({
    onFocusWithinChange: (e) => {
      setOpen(e);
    },
  });

  const listBoxRef = useRef(null);

  return (
    <>
      <span
        {...hoverProps}
        style={{ position: "relative" }}
        {...focusWithinProps}
      >
        <Select
          aria-label="Verein"
          isOpen={isOpen}
          onOpenChange={setOpen}
          onSelectionChange={(e) => {
            console.log(e);
          }}
        >
          <Button
            onFocus={() => {
              if (!isOpen) {
                listBoxRef.current.focus();
              }
            }}
            className={styles.link}
          >
            {label}
          </Button>
          <div
            className={`${isOpen ? styles.isOpen : ""} ${
              styles.listBoxWrapper
            }`}
          >
            <ListBox
              className={styles.listBox}
              aria-label="Links"
              ref={listBoxRef}
            >
              {options.map((option) => (
                <ListBoxItem
                  className={styles.listBoxItem}
                  key={option.name}
                  href={option.href}
                >
                  {option.name}
                </ListBoxItem>
              ))}
            </ListBox>
          </div>
        </Select>
      </span>
    </>
  );
};
