'use client';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import React from 'react';

type PasswordInputProps = Omit<React.ComponentProps<'input'>, 'type'>;

const PasswordInput = ({ className, ...props }: PasswordInputProps) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const type = showPassword ? 'text' : 'password';
  const Icon = showPassword ? EyeOffIcon : EyeIcon;

  const handleToggle = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <div className="relative">
      <Input type={type} className={cn('pe-9', className)} {...props} />

      <button
        type="button"
        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
        onClick={handleToggle}>
        <Icon className="size-4 stroke-muted-foreground" />
      </button>
    </div>
  );
};

export { PasswordInput };
