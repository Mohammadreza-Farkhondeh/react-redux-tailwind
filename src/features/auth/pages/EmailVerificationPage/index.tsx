import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { AuthCard } from '../../components/AuthCard';
import { OtpInput } from '../../components/OtpInput';
import { useToast } from '@/hooks/use-toast';

const verificationSchema = z.object({
  otp: z.string().length(6, { message: 'Please enter the complete OTP' }),
});

type VerificationForm = z.infer<typeof verificationSchema>;

export default function EmailVerificationPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const form = useForm<VerificationForm>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      otp: '',
    },
  });

  const onSubmit = async (data: VerificationForm) => {
    setIsSubmitting(true);
    try {
      // TODO: Implement verify email API call
      toast({
        title: 'Email verified',
        description: 'Your email has been verified successfully.',
      });
      navigate('/login');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to verify email. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendCode = async () => {
    setResendDisabled(true);
    setCountdown(30);

    try {
      // TODO: Implement resend code API call
      toast({
        title: 'Code resent',
        description: 'A new verification code has been sent to your email.',
      });

      // Start countdown
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setResendDisabled(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to resend code. Please try again.',
      });
      setResendDisabled(false);
    }
  };

  return (
    <AuthCard
      title="Verify Your Email"
      description="We've sent a verification code to your email. Enter it below to verify your account."
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Verification Code</FormLabel>
                <FormControl>
                  <OtpInput value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4">
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Verifying...' : 'Verify Email'}
            </Button>

            <div className="text-center">
              <Button
                type="button"
                variant="link"
                onClick={handleResendCode}
                disabled={resendDisabled}
              >
                {resendDisabled
                  ? `Resend code in ${countdown}s`
                  : "Didn't receive the code? Resend"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </AuthCard>
  );
}
