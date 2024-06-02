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
import { useFocus, useFocusWithin, useHover } from "react-aria";
import { useRef, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
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
        { id: "events", name: "Events", href: "/verein/events" },
        {
          id: "organisation",
          name: "Organisation",
          href: "/verein/organisation",
        },
        { id: "sponsoren", name: "Sponsoren", href: "/verein/sponsoren" },
        { id: "halle", name: "Unsere Halle", href: "/verein/halle" },
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
    {
      id: "termine",
      name: "Termine",
      children: [
        { id: "spiele", name: "Spiele", href: "/termine/spiele" },
        {
          id: "feste",
          name: "Feste und andere Termine",
          href: "/termine/feste-und-andere-termine",
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
      <MenuTrigger isOpen={isMenuVisible} onOpenChange={setMenuVisible}>
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
                      <MenuItem
                        className={styles.menuItem}
                        key={item.name}
                        href={item.href && item.href}
                      >
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
                      className={styles.menuItem}
                      key={item.name}
                      href={item.href && item.href}
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
      {/* 
        <div className={styles.hamburgerButtonWrapper}>
          <Button
            className={styles.hamburgerButton}
            onPress={handleMenuVisible}
          >
            <FontAwesomeIcon icon={faBars} />
          </Button>
        </div>
        <div className={`${styles.linkContainer}`}>
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

        <Popover
          className={`${
            isMenuVisible ? styles.menuVisible : styles.menuHidden
          }`}
        >
          <Menu>
            <MenuItem href="/">Start</MenuItem>
            <SubmenuTrigger>
              <MenuItem>Verein</MenuItem>
              <Popover>
                {vereinLinks.map((link) => (
                  <MenuItem id={link.name}>{link.name}</MenuItem>
                ))}
              </Popover>
            </SubmenuTrigger>
          </Menu>
        </Popover> */}
      {/* <div
        className={`${isMenuVisible ? styles.menuVisible : styles.menuHidden}`}
      >
        <Link href={"/"} className={styles.link}>
          Start
        </Link>
        <MobileLinks options={vereinLinks} label={"Verein"} />
        <MobileLinks options={erwachseneLinks} label={"Erwachsene"} />
        <MobileLinks options={jugendLinks} label={"Jugend"} />
        <MobileLinks options={termineLinks} label={"Termine"} />
        <Link href={"/galerie"} className={styles.link}>
          Galerie
        </Link>
        <Link href={"/aktuelles"} className={styles.link}>
          Aktuelles
        </Link>
        <MobileLinks options={anderesLinks} label={"Anderes"} />
      </div> */}
      {/* </div> */}
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
const MobileLinks = ({ options, label }) => {
  return (
    <>
      {label}
      <div className={styles.mobileLinks}>
        {options.map((option) => (
          <Link href={option.href}>{option.name}</Link>
        ))}
      </div>
    </>
  );
};
