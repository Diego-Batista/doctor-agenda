// components/Icons.tsx
"use client";

import { FC } from "react";
import {
  FaAllergies,
  FaBaby,
  FaBalanceScale,
  FaBone,
  FaBrain,
  FaClinicMedical,
  FaClipboardList,
  FaEye,
  FaFlask,
  FaHandHoldingMedical,
  FaHeadSideVirus,
  FaHeart,
  FaLeaf,
  FaLungs,
  FaMicroscope,
  FaRadiation,
  FaRunning,
  FaStethoscope,
  FaSyringe,
  FaTooth,
  FaUserMd,
  FaVial,
  FaVirus,
  FaWheelchair,
  FaXRay,
} from "react-icons/fa";

import { Specialty } from "./specialties";

interface Props {
  name: Specialty | string;
  size?: number;
  color?: string;
}

const icons: Record<Specialty, FC<{ size?: number; color?: string }>> = {
  Alergologia: FaAllergies,
  Anestesiologia: FaSyringe,
  Angiologia: FaHeart,
  Cancerologia: FaClinicMedical,
  Cardiologia: FaHeart,
  "Cirurgia Cardiovascular": FaHeart,
  "Cirurgia de Cabeça e Pescoço": FaUserMd,
  "Cirurgia do Aparelho Digestivo": FaClipboardList,
  "Cirurgia Geral": FaUserMd,
  "Cirurgia Pediátrica": FaBaby,
  "Cirurgia Plástica": FaUserMd,
  "Cirurgia Torácica": FaLungs,
  "Cirurgia Vascular": FaHeart,
  "Clínica Médica": FaStethoscope,
  Dermatologia: FaHandHoldingMedical,
  "Endocrinologia e Metabologia": FaVial,
  Endoscopia: FaMicroscope,
  Gastroenterologia: FaFlask,
  Geriatria: FaUserMd,
  "Ginecologia e Obstetrícia": FaBaby,
  "Hematologia e Hemoterapia": FaVial,
  Hepatologia: FaFlask,
  Homeopatia: FaLeaf,
  Infectologia: FaVirus,
  Mastologia: FaClinicMedical,
  "Medicina de Emergência": FaSyringe,
  "Medicina do Esporte": FaRunning,
  "Medicina do Trabalho": FaStethoscope,
  "Medicina de Família e Comunidade": FaClinicMedical,
  "Medicina Física e Reabilitação": FaWheelchair,
  "Medicina Intensiva": FaStethoscope,
  "Medicina Legal e Perícia Médica": FaBalanceScale,
  Nefrologia: FaVial,
  Neurocirurgia: FaBrain,
  Neurologia: FaBrain,
  Nutrologia: FaClipboardList,
  Oftalmologia: FaEye,
  "Oncologia Clínica": FaClinicMedical,
  "Ortopedia e Traumatologia": FaBone,
  Otorrinolaringologia: FaHeadSideVirus,
  Patologia: FaMicroscope,
  "Patologia Clínica/Medicina Laboratorial": FaFlask,
  Pediatria: FaBaby,
  Pneumologia: FaLungs,
  Psiquiatria: FaBrain,
  "Radiologia e Diagnóstico por Imagem": FaXRay,
  Radioterapia: FaRadiation,
  Reumatologia: FaHandHoldingMedical,
  Urologia: FaTooth,
};

export const Icons: FC<Props> = ({
  name,
  size = 24,
  color = "currentColor",
}) => {
  const Icon = icons[name as keyof typeof icons];
  return (
    <div className="flex size-6 items-center justify-center rounded-full bg-[#E9F2FF]">
      <Icon size={size} color={color} />
    </div>
  );
};
