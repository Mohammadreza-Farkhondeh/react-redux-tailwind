import Logo from '@/assets/Logo';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface AuthCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  showLogo?: boolean;
  className?: string;
}

export function AuthCard({
  title,
  description,
  children,
  footer,
  showLogo = true,
  className,
}: AuthCardProps) {
  return (
    <Card className={cn('w-full', className)}>
      <CardHeader className="space-y-1">
        {showLogo && (
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Logo size="h-10 w-10" />
            {/* <span className="text-2xl font-bold">Your Brand</span> */}
          </div>
        )}
        <CardTitle className="text-2xl text-center">{title}</CardTitle>
        <CardDescription className="text-center">{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
}
