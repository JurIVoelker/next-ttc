import Link from "next/link";
import styles from "./NavBar.module.scss";
import {
  Button,
  ListBox,
  ListBoxItem,
  MenuItem,
  MenuTrigger,
  Popover,
  Menu,
  Select,
  SubmenuTrigger,
} from "react-aria-components";
import { useFocusWithin, useHover } from "react-aria";
import { useRef, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faChevronRight,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  let items = [
    { id: "start", name: "Start", href: "/" },
    {
      id: "verein",
      name: "Verein",
      children: [
        { id: "events", name: "Events & Termine", href: "/verein/events" },
        { id: "spiele", name: "Spiele", href: "/verein/spiele" },
        {
          id: "organisation",
          name: "Organisation",
          href: "/verein/organisation",
        },
        { id: "sponsoren", name: "Sponsoren", href: "/verein/sponsoren" },
        { id: "halle", name: "Unsere Halle", href: "/verein/halle" },
        {
          id: "mitglied",
          name: "Mitglied Werden",
          href: "/verein/mitglied-werden",
        },
      ],
    },
    {
      id: "erwachsene",
      name: "Erwachsene",
      children: [
        { id: "training", name: "Training", href: "/erwachsene/training" },
        {
          id: "mannschaften",
          name: "Mannschaften",
          href: "/erwachsene/mannschaften",
        },
      ],
    },
    {
      id: "jugend",
      name: "Jugend",
      children: [
        { id: "training", name: "Training", href: "/jugend/training" },
        { id: "trainer", name: "Trainer", href: "/jugend/trainer" },
        {
          id: "mannschaften",
          name: "Mannschaften",
          href: "/jugend/mannschaften",
        },
      ],
    },
    { id: "galerie", name: "Galerie", href: "/galerie" },
    { id: "aktuelles", name: "Aktuelles", href: "/aktuelles" },
    {
      id: "anderes",
      name: "Anderes",
      children: [
        { id: "links", name: "Links", href: "/anderes/links" },
        { id: "downloads", name: "Downloads", href: "/anderes/downloads" },
        { id: "impressum", name: "Impressum", href: "/anderes/impressum" },
        {
          id: "datenschutz",
          name: "Datenschutz",
          href: "/anderes/datenschutz",
        },
        { id: "kontakt", name: "Kontakt", href: "/anderes/kontakt" },
      ],
    },
  ];

  const [isMenuVisible, setMenuVisible] = useState(false);

  return (
    <div className={styles.navContainer}>
      <MenuTrigger
        isOpen={isMenuVisible}
        onOpenChange={() => {
          setTimeout(() => {
            setMenuVisible((prev) => !prev);
          }, 10);
        }}
      >
        <div className={styles.buttonContainer}>
          <Button aria-label="Menü">
            <FontAwesomeIcon icon={faBars} />
          </Button>
        </div>
        <Popover className={styles.popover}>
          <Button
            className={styles.exitButton}
            aria-label="Menü schließen"
            onPress={() => {
              setMenuVisible(false);
            }}
          >
            <FontAwesomeIcon icon={faXmark} />
          </Button>
          <div className={styles.menuWrapper}>
            <Menu items={items} className={styles.menu}>
              {function renderSubmenu(item) {
                if (item.children) {
                  return (
                    <SubmenuTrigger>
                      <MenuItem key={item.name} className={styles.menuItem}>
                        {item.name}
                        <FontAwesomeIcon icon={faChevronRight} />
                      </MenuItem>
                      <Popover>
                        <Menu
                          items={item.children}
                          className={`${styles.menu} ${styles.submenu}`}
                        >
                          {(item) => renderSubmenu(item)}
                        </Menu>
                      </Popover>
                    </SubmenuTrigger>
                  );
                } else {
                  return (
                    <MenuItem
                      key={item.name}
                      href={item.href}
                      className={styles.menuItem}
                    >
                      {item.name}
                    </MenuItem>
                  );
                }
              }}
            </Menu>
          </div>
        </Popover>
      </MenuTrigger>
      <div className={styles.menuWrapper}>
        <div className={`${styles.linkContainer}`}>
          {items.map((item) => {
            if (item.children) {
              return (
                <LinkSelect
                  key={item.id}
                  options={item.children}
                  label={item.name}
                />
              );
            } else {
              return (
                <>
                  <Link href={item.href} className={styles.link}>
                    {item.name}
                  </Link>
                </>
              );
            }
          })}
        </div>
      </div>
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
        <Select aria-label="Verein" isOpen={isOpen} onOpenChange={setOpen}>
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
