// components/Icons.tsx
"use client";

import {
  AlertTriangle,
  Baby,
  Bone,
  Brain,
  ClipboardList,
  Eye,
  FlaskConical,
  Heart,
  Hospital,
  Leaf,
  Microscope,
  Radiation,
  Scale,
  Stethoscope,
  Syringe,
  TestTube,
  User,
} from "lucide-react";
import { FC } from "react";

import { Specialty } from "./specialties";

interface Props {
  name: Specialty | string;
  size?: number;
  color?: string;
}

const icons: Record<Specialty, FC<{ size?: number; color?: string }>> = {
  //   Alergologia: AlertTriangle,
  Anestesiologia: Syringe,
  Angiologia: Heart,
  Cancerologia: Hospital,
  Cardiologia: Heart,
  "Cirurgia Cardiovascular": Heart,
  "Cirurgia de Cabeça e Pescoço": User,
  "Cirurgia do Aparelho Digestivo": ClipboardList,
  "Cirurgia Geral": User,
  "Cirurgia Pediátrica": Baby,
  "Cirurgia Plástica": User,
  //   "Cirurgia Torácica": Lungs,
  "Cirurgia Vascular": Heart,
  "Clínica Médica": Stethoscope,
  Dermatologia: User,
  "Endocrinologia e Metabologia": TestTube,
  Endoscopia: Microscope,
  Gastroenterologia: FlaskConical,
  Geriatria: User,
  "Ginecologia e Obstetrícia": Baby,
  "Hematologia e Hemoterapia": TestTube,
  Hepatologia: FlaskConical,
  Homeopatia: Leaf,
  //   Infectologia: Virus,
  Mastologia: Hospital,
  "Medicina de Emergência": Syringe,
  //   "Medicina do Esporte": Running,
  "Medicina do Trabalho": Stethoscope,
  "Medicina de Família e Comunidade": Hospital,
  //   "Medicina Física e Reabilitação": Wheelchair,
  "Medicina Intensiva": Stethoscope,
  "Medicina Legal e Perícia Médica": Scale,
  Nefrologia: TestTube,
  Neurocirurgia: Brain,
  Neurologia: Brain,
  Nutrologia: ClipboardList,
  Oftalmologia: Eye,
  "Oncologia Clínica": Hospital,
  "Ortopedia e Traumatologia": Bone,
  Otorrinolaringologia: AlertTriangle,
  Patologia: Microscope,
  "Patologia Clínica/Medicina Laboratorial": FlaskConical,
  Pediatria: Baby,
  //   Pneumologia: Lungs,
  Psiquiatria: Brain,
  "Radiologia e Diagnóstico por Imagem": Microscope,
  Radioterapia: Radiation,
  Reumatologia: Stethoscope,
  Urologia: TestTube,
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
