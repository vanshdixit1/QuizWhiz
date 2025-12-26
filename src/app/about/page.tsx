import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Phone, Linkedin, Github, Twitter } from 'lucide-react';
import { AnimateOnScroll } from '@/components/animate-on-scroll';

const socialLinks = [
  { icon: Linkedin, href: '#' },
  { icon: Github, href: '#' },
  { icon: Twitter, href: '#' },
];

const AboutPage = () => {
  const aboutImage = PlaceHolderImages.find(img => img.id === 'about');

  return (
    <div className="container py-12 md:py-20">
      <AnimateOnScroll>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-80 md:h-full w-full rounded-2xl overflow-hidden shadow-xl">
            {aboutImage && (
              <Image
                src={aboutImage.imageUrl}
                alt={aboutImage.description}
                fill
                className="object-cover"
                data-ai-hint={aboutImage.imageHint}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent"></div>
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tighter mb-4 font-headline">
              About Me
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              I am a passionate and creative developer dedicated to building beautiful, functional, and user-centric web applications.
            </p>
            <div className="flex justify-center md:justify-start gap-4">
              {socialLinks.map((link, index) => (
                <a key={index} href={link.href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <link.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </AnimateOnScroll>

      <AnimateOnScroll delay={0.2}>
        <Card className="mt-20">
          <CardContent className="p-10 text-center space-y-6">
            <h2 className="text-3xl font-bold font-headline">My Mission</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
              My mission is to leverage technology to create meaningful and impactful digital experiences. I believe in the power of clean code, thoughtful design, and continuous learning to solve real-world problems and bring innovative ideas to life.
            </p>
            <div className="flex flex-wrap justify-center gap-6 pt-4">
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground">your.email@example.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground">+1 (234) 567-890</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </AnimateOnScroll>
    </div>
  );
};

export default AboutPage;
