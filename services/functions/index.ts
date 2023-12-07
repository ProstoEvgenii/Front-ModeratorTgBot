import { v4 as uuidv4 } from 'uuid';

export * from './sendApi'

export const loader = async function (Variable: any) {
  if (!localStorage.uuid) {
    localStorage.uuid = uuidv4()
  }
  return
}