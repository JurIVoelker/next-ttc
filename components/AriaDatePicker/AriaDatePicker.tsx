import React from "react";
import {
  Button,
  Calendar,
  CalendarCell,
  CalendarGrid,
  DateInput,
  DatePicker,
  DateSegment,
  Dialog,
  Group,
  Heading,
  Label,
  Popover,
} from "react-aria-components";

import styles from "./AriaDatePicker.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";

const AriaDatePicker = () => {
  return (
    <DatePicker>
      <Label>Anzeigedatum</Label>
      <Group className={styles.inputGroup}>
        <DateInput className={styles.dateInput}>
          {(segment) => (
            <DateSegment segment={segment} className={styles.dateSegment} />
          )}
        </DateInput>
        <Button>
          <FontAwesomeIcon icon={faCalendar} height={20} />
        </Button>
      </Group>
      <Popover className={styles.popover}>
        <Dialog>
          <Calendar>
            <header className={styles.headerSection}>
              <Button slot="previous">◀</Button>
              <Heading />
              <Button slot="next">▶</Button>
            </header>
            <CalendarGrid className={styles.calendarGrid}>
              {(date) => <CalendarCell date={date} />}
            </CalendarGrid>
          </Calendar>
        </Dialog>
      </Popover>
    </DatePicker>
  );
};

export default AriaDatePicker;
