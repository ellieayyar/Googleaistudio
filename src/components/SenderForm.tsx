import React, { useEffect, useRef } from 'react';

interface SenderFormProps {
  formId?: string;
}

export default function SenderForm({ formId = 'dG6Jpr' }: SenderFormProps) {
  const renderedRef = useRef<boolean>(false);

  useEffect(() => {
    const win = window as any;

    const renderForm = () => {
      // Use a useRef guard so render only fires once per mount
      if (renderedRef.current) return;
      if (win.senderForms && typeof win.senderForms.render === 'function') {
        win.senderForms.render(formId);
        renderedRef.current = true;
      }
    };

    const handleLoad = () => {
      renderForm();
    };

    // On mount: if window.senderFormsLoaded is true, call window.senderForms.render(FORM_ID);
    // otherwise add a one-time onSenderFormsLoaded listener that calls render
    if (win.senderFormsLoaded) {
      renderForm();
    } else {
      window.addEventListener('onSenderFormsLoaded', handleLoad, { once: true });
    }

    return () => {
      // On unmount: call window.senderForms.destroy(FORM_ID)
      if (renderedRef.current && win.senderForms && typeof win.senderForms.destroy === 'function') {
        win.senderForms.destroy(formId);
        renderedRef.current = false;
      }
      window.removeEventListener('onSenderFormsLoaded', handleLoad);
    };
  }, [formId]);

  // Render only <div className="sender-form-field" data-sender-form-id="FORM_ID"></div>
  return (
    <div 
      className="sender-form-field" 
      data-sender-form-id={formId}
      style={{ textAlign: 'left' }}
    />
  );
}
