import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Mail, Linkedin, Github, Twitter } from 'lucide-react';
import { AnimateOnScroll } from '@/components/animate-on-scroll';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const socialLinks = [
  { icon: Linkedin, href: '#', name: 'LinkedIn' },
  { icon: Github, href: '#', name: 'GitHub' },
  { icon: Twitter, href: '#', name: 'Twitter' },
];

const AboutPage = () => {
  const aboutImage = PlaceHolderImages.find(img => img.id === 'about-hero');

  return (
    <div className="container py-12 md:py-20 max-w-4xl mx-auto">
      <AnimateOnScroll>
        <Card className="overflow-hidden">
          <CardHeader className="p-0">
            <div className="relative h-48 w-full">
              {aboutImage && (
                <Image
                  src={aboutImage.imageUrl}
                  alt={aboutImage.description}
                  fill
                  className="object-cover"
                  data-ai-hint={aboutImage.imageHint}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            </div>
          </CardHeader>
          <CardContent className="p-6 md:p-8 text-center -mt-16">
            <Avatar className="h-32 w-32 mx-auto mb-4 border-4 border-background shadow-lg">
              <AvatarImage src={`https://api.dicebear.com/8.x/initials/svg?seed=Vansh`} alt="Vansh Dixit" />
              <AvatarFallback className="text-4xl">V</AvatarFallback>
            </Avatar>
            <CardTitle className="text-3xl font-bold font-headline">
              Vansh Dixit
            </CardTitle>
            <CardDescription className="text-lg text-muted-foreground mt-1">
              Passionate &amp; Creative Developer
            </CardDescription>

            <p className="text-muted-foreground max-w-2xl mx-auto mt-6">
              My mission is to leverage technology to create meaningful and impactful digital experiences. I believe in the power of clean code, thoughtful design, and continuous learning to solve real-world problems and bring innovative ideas to life.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6">
              <a href="mailto:dixitvansh140@gmail.com" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-5 w-5" />
                <span>dixitvansh140@gmail.com</span>
              </a>
              <div className="flex items-center gap-4">
                {socialLinks.map((link) => (
                  <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                    <link.icon className="h-6 w-6" />
                    <span className="sr-only">{link.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </AnimateOnScroll>
    </div>
  );
};

export default AboutPage;
