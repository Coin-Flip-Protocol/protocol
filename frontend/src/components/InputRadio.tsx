export type InputRadioProps = {
  checked: boolean;
  onChange: () => void;
  children: string;
};

export default function InputRadio({
  checked,
  onChange,
  children,
}: InputRadioProps) {
  return (
    <label className="text-sm text-gray-900 dark:text-gray-300 leading-4">
      <input
        type="radio"
        className="w-4 h-4 align-middle text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        name="isHeads"
        checked={checked}
        required
        onChange={onChange}
      />
      <span className="inline-block ml-2 align-middle">{children}</span>
    </label>
  );
}
