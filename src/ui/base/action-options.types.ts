import { Locator, Request } from '@playwright/test';

interface Timed {
  timeout?: number;
}

interface Retryable {
  retries?: number;
}

interface Waitable {
  waitFor?: Locator;
}

interface Forceable {
  force?: boolean;
}

/**
 * Options for click actions on elements.
 *
 * Used to customize clicking behavior in the UIBase, allowing for:
 * - Overriding default timeouts
 * - Forcing the click even if the element is not interactable
 * - Retrying the action multiple times
 * - Waiting for another element to appear/disappear after the click
 */
export interface ClickOptions extends Timed, Retryable, Waitable, Forceable {}

/**
 * Options for typing actions in input fields.
 *
 * Used to control how text is entered in fields, such as:
 * - Overriding the default typing timeout
 * - Clearing the field before typing
 * - Adding delay between keystrokes for more realistic typing
 * - Retrying the typing action
 * - Waiting for another element after typing
 * - Automatically pressing Enter after typing
 */
export interface TypeOptions extends Timed, Retryable, Waitable {
  clear?: boolean;
  delay?: number;
  pressEnter?: boolean;
}

/**
 * Options for drag and drop actions between elements or to coordinates.
 *
 * Allows you to customize drag-and-drop actions, such as:
 * - Specifying custom timeouts for the operation
 * - Defining the number of steps (for animation or precision)
 * - Adding delays between steps
 * - Retrying the drag and drop action
 */
export interface DragAndDropOptions extends Timed, Retryable {
  steps?: number;
  delay?: number;
}

/**
 * Options for waiting for an element to reach a certain state.
 *
 * Useful for controlling explicit waits in your flows, including:
 * - Waiting for an element to appear, disappear, become visible, or hidden
 * - Custom timeouts for each wait
 * - Retrying the wait action
 */
export interface WaitForElementOptions extends Timed, Retryable {
  state?: 'attached' | 'detached' | 'visible' | 'hidden';
}

/**
 * Options for retrieving text content from elements.
 *
 * Lets you control how text is extracted, such as:
 * - Custom timeouts for getting the text
 * - Retrying on failure
 * - Waiting for a specific locator before extracting
 * - Optionally trimming the result
 */
export interface GetTextOptions extends Timed, Retryable, Waitable {
  trim?: boolean;
}

/**
 * Options for counting the number of elements matching a locator.
 *
 * Controls how elements are counted, such as:
 * - Custom timeout for the count
 * - Deciding if only visible elements should be counted
 * - Retrying the action
 */
export interface CountElementsOptions extends Timed, Retryable {
  visibleOnly?: boolean;
}

/**
 * Options for hovering over elements.
 *
 * Controls hover actions, for cases where:
 * - Custom timeouts are needed
 * - Forcing hover over an element
 * - Retrying the hover action on failure
 */
export interface HoverOptions extends Timed, Retryable, Forceable {}

/**
 * Options for clipboard-related actions (copy/paste).
 *
 * Provides custom control for clipboard actions:
 * - Custom timeouts for clipboard operations
 * - Retrying on failure
 */
export interface ClipboardOptions extends Timed, Retryable {}

/**
 * Options for handling browser alerts and modals.
 *
 * Lets you manage alert/modals handling, such as:
 * - Custom timeouts for alert actions
 * - Retrying in case alert handling fails
 */
export interface AlertOptions extends Timed, Retryable {}

/**
 * Options for file upload actions.
 *
 * Controls how files are uploaded, including:
 * - Custom timeout for file upload
 * - Retrying the upload action
 */
export interface FileUploadOptions extends Timed, Retryable {}

/**
 * Options for file download actions.
 *
 * Controls file download flows, such as:
 * - Custom timeouts for downloads
 * - Retrying download on failure
 */
export interface FileDownloadOptions extends Timed, Retryable {}

/**
 * Options for switching to and working with iframes.
 *
 * Manages how iframe actions are performed, such as:
 * - Custom timeouts for switching
 * - Retrying switching or finding elements within iframes
 */
export interface IFrameOptions extends Timed, Retryable {}

/**
 * Options for waiting for specific network requests.
 *
 * Controls how request waits are performed:
 * - Custom timeout for request waiting
 * - Retrying on request not matching or timing out
 * - Using a predicate function for custom match logic
 */
export interface WaitForRequestOptions extends Timed, Retryable {
  predicate?: (req: Request) => boolean;
}

/**
 * Options for waiting for a custom condition to be met.
 *
 * Controls custom wait flows, such as:
 * - Custom timeout for the condition
 * - Retrying the condition check
 * - Interval (in ms) between retries
 */
export interface WaitForConditionOptions extends Timed, Retryable {
  intervalMs?: number;
}

/**
 * Options for checking element states like enabled, disabled, checked, or unchecked.
 *
 * Controls validation of UI states, such as:
 * - Custom timeout for state checks
 * - Retrying state check if needed
 */
export interface StateCheckOptions extends Timed, Retryable {}

/**
 * Options for double click actions on elements.
 *
 * Used to customize double-clicking behavior in the UIBase, allowing for:
 * - Overriding default timeouts
 * - Forcing the double click even if the element is not interactable
 * - Retrying the action multiple times
 * - Waiting for another element to appear/disappear after the double click
 */
export interface DoubleClickOptions extends Timed, Retryable, Waitable, Forceable {}
