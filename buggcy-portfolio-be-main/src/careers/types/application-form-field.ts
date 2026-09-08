/**
 * Defines the shape of a single custom field in a career's dynamic
 * "Application Form Builder". These are stored as JSON on the Career
 * entity (`applicationFormSchema`) and rendered by the public apply page.
 *
 * Note: First Name, Last Name, Email, Phone, Resume and Cover Letter are
 * permanent built-in fields on every application (they map to fixed
 * columns on JobApplication) and are therefore NOT part of this builder.
 * Only additional, job-specific fields are modeled here.
 */
export enum ApplicationFieldType {
  TEXT = 'text',
  EMAIL = 'email',
  PHONE = 'phone',
  NUMBER = 'number',
  TEXTAREA = 'textarea',
  SELECT = 'select',
  RADIO = 'radio',
  CHECKBOX = 'checkbox',
  DATE = 'date',
  URL = 'url',
  FILE = 'file',
}

// Field types that require an `options` list to choose from.
export const OPTION_BASED_FIELD_TYPES = [
  ApplicationFieldType.SELECT,
  ApplicationFieldType.RADIO,
];

export interface ApplicationFormField {
  /** Stable unique id for this field (used as the extraData/form key). */
  id: string;
  label: string;
  fieldType: ApplicationFieldType;
  placeholder?: string;
  required: boolean;
  order: number;
  /** Only used for `select` and `radio` field types. */
  options?: string[];
}
