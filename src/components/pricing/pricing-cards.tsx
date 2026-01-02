
"use client";

import { useAuth } from '@/contexts/auth-context';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '../ui/button';
import { Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const plans = [
    {
        name: "Monthly",
        price: 299,
        priceSuffix: "/month",
        popular: false,
        features: [
            "AI Quiz Generation (Topic)",
            "AI Quiz Generation (PDF)",
            "Unlimited Quiz Attempts",
            "Advanced Progress Tracking",
            "Priority Support",
        ]
    },
    {
        name: "Yearly",
        price: 2999,
        priceSuffix: "/year",
        popular: true,
        features: [
            "All Monthly features",
            "Save over 15%",
            "Early access to new features",
            "Exclusive content",
        ]
    }
]

export default function PricingCards() {
    const { user } = useAuth();
    const { toast } = useToast();

    const handleSubscribeClick = () => {
        toast({
          title: "Contact Us for Premium",
          description: "Please email us at dixitvansh140@gmail.com to get your premium subscription.",
        });
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-16">
            {plans.map((plan) => (
                <Card key={plan.name} className={cn("flex flex-col", plan.popular && "border-primary ring-2 ring-primary")}>
                    {plan.popular && <div className="bg-primary text-primary-foreground text-center py-1.5 px-3 text-sm font-semibold rounded-t-lg rounded-b-none">Most Popular</div>}
                    <CardHeader>
                        <CardTitle className="text-2xl">{plan.name}</CardTitle>
                        <CardDescription>Perfect for {plan.name === 'Monthly' ? 'flexible learning' : 'dedicated learners'}.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow space-y-6">
                        <div className="flex items-baseline">
                            <span className="text-4xl font-bold">₹{plan.price}</span>
                            <span className="text-muted-foreground ml-1">{plan.priceSuffix}</span>
                        </div>
                        <ul className="space-y-3">
                            {plan.features.map((feature, index) => (
                                <li key={index} className="flex items-center gap-3">
                                    <Check className="h-5 w-5 text-green-500" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button 
                            onClick={handleSubscribeClick}
                            className="w-full" 
                            size="lg"
                            variant={plan.popular ? "default" : "outline"}
                            disabled={user?.isPremium}
                        >
                            {user?.isPremium ? 'You are a Premium Member' : `Choose ${plan.name}`}
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}
