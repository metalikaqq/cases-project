"use client"

import Modal from "@/UI/Modal";
import EmailForm from "@/components/EmailForm";
import { useState } from "react";

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
      >
        <EmailForm />
      </Modal>
    </div>
  );
}
