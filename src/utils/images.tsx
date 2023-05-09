export function removeImageTransformations(url: string): string {
  // Define a regular expression to match the optional transformations part of the URL.
  // The regular expression looks for the string "upload/" followed by an optional
  // non-capturing group containing any characters (excluding "/") that may include commas,
  // and ending with a "/" immediately before the bucket ID (which starts with "v").
  const regex = /upload\/(?:[^/]*,?[^/]+\/)?(v[^/]+\/)/;

  // Use the replace method to remove the matched transformations from the URL
  // and keep the bucket ID.
  const resultUrl = url.replace(regex, 'upload/q_auto,f_auto,w_1920/$1');

  return resultUrl;
}
