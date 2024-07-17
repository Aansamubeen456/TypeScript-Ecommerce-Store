import { useNavigation } from 'react-router-dom';
import { Button } from './ui/button';
// takes 2 props
//  text
// classname

// navigatio hook and check for issubmitting
// if true chnage the button text into ...submitting and make it disabled
// if false the set it to text variable

function SubmitBtn({ text, className }: { text: string; className: string }) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <Button type="submit" className={className} disabled={isSubmitting}>
      {isSubmitting ? (
        <span className="w-4 h-4 animate-spin mr-2">Submitting...</span>
      ) : (
        text
      )}
    </Button>
  );
}

export default SubmitBtn;
