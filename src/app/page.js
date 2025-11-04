"use client";

import { useState } from "react";
import Image from "next/image";
import { Dialog } from "@headlessui/react";
import HeroSection from "@/components/ui/section/HeroSection";
import FiturSection from "@/components/ui/section/FiturSection";
import GaleriTemplateSection from "@/components/ui/section/GaleriSection";
import PaketSection from "@/components/ui/section/PaketSection";
import MemilihKamiSection from "@/components/ui/section/MemilihKamiSection";
import FormWa from "@/components/form/FormWa";

export default function HomePage() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  return (
    <div className="w-full min-h-screen font-sans">
      <HeroSection />
      <FiturSection />
      <GaleriTemplateSection
        setSelectedTemplate={setSelectedTemplate}
        setOpenModal={setOpenModal}
      />
      <MemilihKamiSection />
      <PaketSection />
      <FormWa />

      {/* Modal */}
      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-xl max-w-3xl w-full shadow-lg overflow-hidden">
            {selectedTemplate && (
              <Image
                src={selectedTemplate.src}
                alt={selectedTemplate.name}
                width={800}
                height={800}
                className="w-full h-auto"
              />
            )}
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
