import { LEGACY_BLUR } from '../constants/headerTreatments';
export default function imageToHeaderTreatments(imageTreatments) {
  return Object.keys(imageTreatments).filter(treatment => treatment !== LEGACY_BLUR);
}
