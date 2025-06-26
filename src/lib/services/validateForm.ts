import { type DomainEvent } from '$lib/stores/ObjectStore';
import { notificationStore } from '$lib/stores/notifications';

interface FormError {
  message: string;
}

export interface FormData {
  target: Record<string, { name: string; required: boolean; value: string }>;
}

export function validateEmptyInput(formData: FormData): string[] {
  if (!formData.target) {
    return [];
  }
  const errObject = [];
  for (const field in formData.target) {
    if (formData.target[field].required && formData.target[field].value === '') {
      errObject.push(formData.target[field].name);
    }
  }
  return errObject;
}

const buildTimeStamp = (date: string, time: string): Date => {
  return new Date(`${date}T${time}Z`);
};

export function validateEventData(event: DomainEvent): FormError[] {
  //const event = get(EventStore);
  const formErrors: FormError[] = [];

  if (!event) {
    throw new Error('Event could be found');
  }
  const {
    startdate,
    starttime,
    enddate,
    endtime,
    publishdate,
    publishtime,
    unpublishdate,
    unpublishtime,
  } = event;

  const startDateTime = starttime && startdate && buildTimeStamp(startdate, starttime).getTime();
  const endDateTime = enddate && endtime && buildTimeStamp(enddate, endtime).getTime();
  const publishDateTime =
    publishdate && publishtime && buildTimeStamp(publishdate, publishtime).getTime();
  const unpublishDateTime =
    unpublishdate && unpublishtime && buildTimeStamp(unpublishdate, unpublishtime).getTime();

  if (!startdate) {
    notificationStore.addToast('error', 'Mandatory start date is empty');
  } else if (!starttime) {
    notificationStore.addToast('error', 'Mandatory start time is empty');
  }

  if (new Date(startdate) < new Date()) {
    notificationStore.addToast('error', 'The start date cannot be in the past');
  }

  if (startDateTime && endDateTime) {
    if (endDateTime < startDateTime) {
      notificationStore.addToast('error', 'The event end cannot be before the event start');
    } else if (endDateTime === startDateTime) {
      notificationStore.addToast('warning', 'Both start and end date-time are the same');
    }
  }

  if (startDateTime && publishDateTime && startDateTime < publishDateTime) {
    notificationStore.addToast('error', 'The publish date cannot be after the start date');
  }

  if (unpublishDateTime && publishDateTime) {
    if (unpublishDateTime < publishDateTime) {
      notificationStore.addToast('error', 'The unpublish date cannot be before the publish date');
    } else if (unpublishDateTime === publishDateTime) {
      notificationStore.addToast('warning', 'Both publish and unpublish date-time are the same.');
    }

    return formErrors;
  }
}
