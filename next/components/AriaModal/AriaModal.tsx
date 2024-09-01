import { Button, Dialog, Modal, ModalOverlay } from "react-aria-components";

import styles from "./AriaModal.module.scss";

const AriaModal = ({ title, text, onConfirm }) => {
  return (
    <ModalOverlay className={styles.modalOverlay} isDismissable>
      <Modal className={styles.modal}>
        <Dialog className={styles.dialog}>
          {({ close }) => (
            <form>
              <h3>{title}</h3>
              <p>{text}</p>
              <div className={styles.buttonGroup}>
                <Button
                  className={styles.abortButton}
                  onPress={() => {
                    close();
                  }}
                >
                  Abbrechen
                </Button>
                <Button
                  className={styles.submitButton}
                  onPress={() => {
                    close();
                    onConfirm();
                  }}
                >
                  Fortfahren
                </Button>
              </div>
            </form>
          )}
        </Dialog>
      </Modal>
    </ModalOverlay>
  );
};

export default AriaModal;
