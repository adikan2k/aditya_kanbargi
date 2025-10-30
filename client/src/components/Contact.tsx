import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Linkedin, Github, Twitter } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="py-24 bg-muted/30">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-center">
          Get In Touch
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Have a question or want to work together? Feel free to reach out
          directly or use the contact form below.
        </p>

        <div className="grid lg:grid-cols-5 gap-8">
          <Card className="lg:col-span-3 p-8">
            <h3 className="font-semibold text-xl mb-6">Send a Message</h3>
            {submitted ? (
              <div className="text-center py-12">
                <p className="text-green-600 font-semibold text-lg mb-2">
                  Message sent successfully!
                </p>
                <p className="text-muted-foreground">
                  I'll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    data-testid="input-contact-name"
                    required
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    data-testid="input-contact-email"
                    required
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="Your Message"
                    rows={6}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    data-testid="input-contact-message"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  data-testid="button-send-message"
                >
                  Send Message
                </Button>
              </form>
            )}
          </Card>

          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4">
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <div className="font-medium">Email</div>
                    <a
                      href="mailto:alex@example.com"
                      className="text-muted-foreground hover:text-primary"
                    >
                      alex@example.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <div className="font-medium">Location</div>
                    <div className="text-muted-foreground">
                      San Francisco, CA
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4">Connect</h3>
              <div className="flex flex-col gap-3">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary"
                  data-testid="link-linkedin"
                >
                  <Linkedin className="h-5 w-5" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary"
                  data-testid="link-github"
                >
                  <Github className="h-5 w-5" />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary"
                  data-testid="link-twitter"
                >
                  <Twitter className="h-5 w-5" />
                  <span>Twitter</span>
                </a>
              </div>
            </Card>

            <Card className="p-6 bg-primary/10 border-primary/20">
              <h3 className="font-semibold text-lg mb-2">
                Can't wait? Book directly
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Schedule a meeting instantly using the booking calendar above.
              </p>
              <Button
                variant="default"
                className="w-full"
                onClick={() =>
                  document
                    .getElementById("booking")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                data-testid="button-quick-book"
              >
                Book a Meeting
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
