import Logo from './logo';

const Footer = () => {
  return (
    <footer className="border-t bg-card">
      <div className="container flex items-center justify-between py-6">
        <Logo className="text-base" />
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} QuizWhiz. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
