import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';

type FormCheckboxProps = {
  label?: string;
  defaultValue?: string;
  name: string;
};

function FormCheckbox({ label, defaultValue, name }: FormCheckboxProps) {
  const defaultChecked = defaultValue === 'on' ? true : false;
  return (
    <div className="mb-2 flex justify-between self-end">
      <Label htmlFor={name} className="capitalize">
        {label || name}
      </Label>
      <Checkbox id={name} defaultChecked={defaultChecked} name={name} />
    </div>
  );
}

export default FormCheckbox;
