import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ChevronRight,
  Users,
  Clock,
  TrendingUp,
  Headphones,
  Shield,
  CheckCircle,
  Handshake,
  Target,
  Lightbulb,
  MessageCircle,
  X,
  Send,
  Bot,
  Loader2,
  Phone,
  Mail,
  Building2,
  Menu,
  Quote,
  Star,
  Award,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Streamdown } from "streamdown";

/**
 * Yavoren Services - Workforce Solutions Website
 * Design: Modern Professional with Teal Accent
 * Color Palette: Teal (#0E8B8B), Dark Gray (#2D3748), Light Gray (#F7FAFC)
 * Typography: Poppins Bold for headings, Inter Regular for body
 */

interface ProjectMilestone {
  id: number;
  period: string;
  status: string;
  title: string;
  client: string;
  endClient: string;
  pax: number | string;
  locations?: string[];
}

interface Service {
  id: number;
  number: string;
  title: string;
  titleZh: string;
  titleMs: string;
  description: string;
  descriptionZh: string;
  descriptionMs: string;
  icon: React.ReactNode;
}

interface Industry {
  name: string;
  nameZh: string;
  nameMs: string;
  icon: React.ReactNode;
}

interface Benefit {
  title: string;
  titleZh: string;
  titleMs: string;
  description: string;
  descriptionZh: string;
  descriptionMs: string;
  icon: React.ReactNode;
}

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const projectMilestones: ProjectMilestone[] = [
  {
    id: 1,
    period: "2022 – CURRENT",
    status: "01",
    title: "SKILLED & GENERAL LABOUR SUPPLY AND WORKFORCE MANAGEMENT",
    client: "Longterm Distribution Sdn. Bhd. – Kluang",
    endClient: "Kimberly Clark",
    pax: "30–50",
  },
  {
    id: 2,
    period: "JUNE 2023 – DEC 2023",
    status: "02",
    title: "NETWORKING CABLING FOR MOBILE NETWORK SHARING",
    client: "Asianatics Sdn. Bhd.",
    endClient: "Q Sentral, KL Sentral",
    pax: 12,
  },
  {
    id: 3,
    period: "MAY 2024 – DEC 2024",
    status: "03",
    title: "MAXIS NETWORK CABLING WORKS",
    client: "Asianatics Sdn. Bhd.",
    endClient: "Maxis Network",
    pax: 16,
    locations: ["Wisma RTM", "Wisma Genting", "Menara Great Eastern 1"],
  },
  {
    id: 4,
    period: "JULY 2024 – DEC 2024",
    status: "04",
    title: "NETWORKING CABLING FOR MOBILE NETWORK SHARING",
    client: "Asianatics Sdn. Bhd.",
    endClient: "Plaza Conlay",
    pax: 16,
  },
  {
    id: 5,
    period: "MARCH 2025 – CURRENT",
    status: "05",
    title: "GENERAL WORKER & CLEANERS",
    client: "Dynaplas Polymer Sdn. Bhd.",
    endClient: "Dynaplas Polymer Sdn. Bhd.",
    pax: "5–10",
  },
  {
    id: 6,
    period: "AUG 2025 – CURRENT",
    status: "06",
    title: "SKILLED & GENERAL LABOUR SUPPLY AND WORKFORCE MANAGEMENT (LOCAL)",
    client: "Longterm Distribution Sdn. Bhd. – PTT Business Hub",
    endClient: "Mixed Endusers",
    pax: 10,
  },
  {
    id: 7,
    period: "AUG 2025 – CURRENT",
    status: "07",
    title: "SKILLED & GENERAL LABOUR SUPPLY AND WORKFORCE MANAGEMENT (LOCAL)",
    client: "Longterm Distribution Sdn. Bhd. – Pelabuhan Tanjung Pelepas",
    endClient: "Mixed Endusers",
    pax: 10,
  },
  {
    id: 8,
    period: "AUG 2025 – APRIL 2026",
    status: "08",
    title: "LINE OPERATORS, QC, PACKAGING, ELECTRONIC TESTERS",
    client: "Nulatex Sdn. Bhd.",
    endClient: "Nulatex Sdn. Bhd.",
    pax: 50,
  },
];

const services: Service[] = [
  {
    id: 1,
    number: "1",
    title: "TEMPORARY STAFFING",
    titleZh: "临时人力供应",
    titleMs: "Penstafan Sementara",
    description: "Short-term workers for seasonal or project-based needs.",
    descriptionZh: "为季节性或项目需求提供短期劳动力。",
    descriptionMs: "Pekerja jangka pendek untuk keperluan bermusim atau berasaskan projek.",
    icon: <Clock className="w-8 h-8" />,
  },
  {
    id: 2,
    number: "2",
    title: "PERMANENT RECRUITMENT",
    titleZh: "长期招聘服务",
    titleMs: "Pengambilan Tetap",
    description: "Finding full-time employees for client companies.",
    descriptionZh: "为客户公司寻找全职员工。",
    descriptionMs: "Mencari pekerja sepenuh masa untuk syarikat pelanggan.",
    icon: <Users className="w-8 h-8" />,
  },
  {
    id: 3,
    number: "3",
    title: "SKILLED LABOUR SUPPLY",
    titleZh: "技术工人供应",
    titleMs: "Bekalan Buruh Mahir",
    description: "Providing specialized professionals like electricians, plumbers or IT experts.",
    descriptionZh: "提供电工、水管工或IT专家等专业技术人员。",
    descriptionMs: "Menyediakan profesional khusus seperti jurueletrik, tukang paip atau pakar IT.",
    icon: <CheckCircle className="w-8 h-8" />,
  },
  {
    id: 4,
    number: "4",
    title: "UNSKILLED LABOUR SUPPLY",
    titleZh: "普通工人供应",
    titleMs: "Bekalan Buruh Am",
    description: "Offering general worker for basic task.",
    descriptionZh: "为基础工作提供普通劳动力。",
    descriptionMs: "Menawarkan pekerja am untuk tugas-tugas asas.",
    icon: <Users className="w-8 h-8" />,
  },
  {
    id: 5,
    number: "5",
    title: "WORKFORCE MANAGEMENT",
    titleZh: "劳动力管理",
    titleMs: "Pengurusan Tenaga Kerja",
    description: "Handling payroll, compliance, and employee benefits for the supplied workforce.",
    descriptionZh: "负责所提供劳动力的薪资、合规及员工福利管理。",
    descriptionMs: "Menguruskan gaji, pematuhan, dan faedah pekerja bagi tenaga kerja yang dibekalkan.",
    icon: <TrendingUp className="w-8 h-8" />,
  },
  {
    id: 6,
    number: "6",
    title: "ON-SITE SUPERVISION",
    titleZh: "现场监督管理",
    titleMs: "Penyeliaan Di Tapak",
    description: "Managing the supplied workforce directly at the client's location.",
    descriptionZh: "直接在客户现场管理所提供的劳动力。",
    descriptionMs: "Mengurus tenaga kerja yang dibekalkan secara langsung di lokasi pelanggan.",
    icon: <Users className="w-8 h-8" />,
  },
  {
    id: 7,
    number: "7",
    title: "TRAINING SERVICES",
    titleZh: "培训服务",
    titleMs: "Perkhidmatan Latihan",
    description: "Preparing workers with necessary certifications or skills.",
    descriptionZh: "为工人提供必要的认证或技能培训。",
    descriptionMs: "Menyediakan pekerja dengan sijil atau kemahiran yang diperlukan.",
    icon: <Lightbulb className="w-8 h-8" />,
  },
  {
    id: 8,
    number: "8",
    title: "LABOR ACCOMMODATION",
    titleZh: "员工住宿安排",
    titleMs: "Penginapan Pekerja",
    description: "Offering accommodation and manage supply accommodation needs for client's general workers.",
    descriptionZh: "为客户的普通工人提供及管理住宿需求。",
    descriptionMs: "Menawarkan dan mengurus keperluan penginapan untuk pekerja am pelanggan.",
    icon: <Users className="w-8 h-8" />,
  },
];

const industries: Industry[] = [
  { name: "Manufacturing", nameZh: "制造业", nameMs: "Pembuatan", icon: <TrendingUp className="w-8 h-8" /> },
  { name: "Warehousing & Distribution", nameZh: "仓储与配送", nameMs: "Pergudangan & Pengedaran", icon: <Users className="w-8 h-8" /> },
  { name: "Logistics & Supply Chain", nameZh: "物流与供应链", nameMs: "Logistik & Rantaian Bekalan", icon: <TrendingUp className="w-8 h-8" /> },
  { name: "Telecommunications Infrastructure", nameZh: "电信基础设施", nameMs: "Infrastruktur Telekomunikasi", icon: <Users className="w-8 h-8" /> },
  { name: "Electronics Manufacturing", nameZh: "电子制造业", nameMs: "Pembuatan Elektronik", icon: <TrendingUp className="w-8 h-8" /> },
  { name: "Commercial Buildings", nameZh: "商业建筑", nameMs: "Bangunan Komersial", icon: <Users className="w-8 h-8" /> },
];

const benefits: Benefit[] = [
  {
    title: "COST-EFFECTIVE",
    titleZh: "经济实惠",
    titleMs: "Kos Efektif",
    description: "Reduces recruitment and administrative costs.",
    descriptionZh: "降低招聘及行政成本。",
    descriptionMs: "Mengurangkan kos pengambilan dan pentadbiran.",
    icon: <TrendingUp className="w-8 h-8" />,
  },
  {
    title: "FLEXIBILITY",
    titleZh: "灵活弹性",
    titleMs: "Fleksibiliti",
    description: "Adjust workforce size based on demand.",
    descriptionZh: "根据需求灵活调整劳动力规模。",
    descriptionMs: "Laraskan saiz tenaga kerja mengikut permintaan.",
    icon: <Users className="w-8 h-8" />,
  },
  {
    title: "COMPLIANCE",
    titleZh: "合规保障",
    titleMs: "Pematuhan",
    description: "Ensures workers meet local legal and regulatory requirements.",
    descriptionZh: "确保工人符合当地法律法规要求。",
    descriptionMs: "Memastikan pekerja memenuhi keperluan undang-undang dan peraturan tempatan.",
    icon: <Shield className="w-8 h-8" />,
  },
  {
    title: "TIME-SAVING",
    titleZh: "节省时间",
    titleMs: "Menjimatkan Masa",
    description: "Faster hiring process.",
    descriptionZh: "更快速的招聘流程。",
    descriptionMs: "Proses pengambilan yang lebih pantas.",
    icon: <Clock className="w-8 h-8" />,
  },
  {
    title: "ACCESS TO EXPERTISE",
    titleZh: "专业人才资源",
    titleMs: "Akses Kepakaran",
    description: "Companies can tap into a pool of pre-vetted, experienced workers.",
    descriptionZh: "企业可获取经过审核的专业工人资源库。",
    descriptionMs: "Syarikat boleh mengakses kumpulan pekerja berpengalaman yang telah disemak.",
    icon: <CheckCircle className="w-8 h-8" />,
  },
];

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  company: string;
  industry: string;
  metrics: { label: string; value: string }[];
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      "YAVOREN Services delivered 30–50 skilled workers consistently for our Kluang distribution centre. Their workforce management is seamless — payroll, compliance, and on-site supervision handled without any disruption to our operations.",
    author: "Operations Manager",
    role: "Logistics & Distribution",
    company: "Longterm Distribution Sdn. Bhd.",
    industry: "Warehousing & Distribution",
    metrics: [
      { label: "Workers Deployed", value: "30–50" },
      { label: "Engagement Duration", value: "3+ Years" },
      { label: "Uptime", value: "99%" },
    ],
  },
  {
    id: 2,
    quote:
      "We engaged YAVOREN for our Maxis network cabling project across three major KL buildings. Their team of 16 technicians completed the works on schedule and to specification. Professional, reliable, and highly recommended.",
    author: "Project Director",
    role: "Telecommunications",
    company: "Asianatics Sdn. Bhd.",
    industry: "Telecommunications Infrastructure",
    metrics: [
      { label: "Technicians Deployed", value: "16" },
      { label: "Project Sites", value: "3" },
      { label: "Delivery", value: "On Time" },
    ],
  },
  {
    id: 3,
    quote:
      "YAVOREN supplied 50 line operators, QC staff, and electronic testers for our production facility. The workers were pre-vetted, trained, and ready to contribute from day one. Our production targets were met without compromise.",
    author: "Plant Manager",
    role: "Electronics Manufacturing",
    company: "Nulatex Sdn. Bhd.",
    industry: "Electronics Manufacturing",
    metrics: [
      { label: "Workers Deployed", value: "50" },
      { label: "Roles Filled", value: "4 Types" },
      { label: "Productivity", value: "High" },
    ],
  },
];

// ─── Floating Chatbot Component ───────────────────────────────────────────────

function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm the YAVOREN Services assistant. How can I help you today? You can ask me about our workforce solutions, services, or industries we serve.",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sendMutation = trpc.chat.send.useMutation({
    onSuccess: (data) => {
      setMessages((prev) => [...prev, { role: "assistant", content: data.content }]);
    },
    onError: () => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I'm sorry, I encountered an error. Please try again or contact us directly at sales@yavoren.com.",
        },
      ]);
    },
  });

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSend = () => {
    const text = inputValue.trim();
    if (!text || sendMutation.isPending) return;

    const newMessages: ChatMessage[] = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
    setInputValue("");

    sendMutation.mutate({
      messages: newMessages,
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const suggestedPrompts = [
    "What services do you offer?",
    "Which industries do you serve?",
    "How do I hire workers through YAVOREN?",
  ];

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden"
          style={{ height: "480px" }}
        >
          {/* Header */}
          <div className="bg-[#0E8B8B] text-white px-4 py-3 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-sm">YAVOREN Assistant</p>
                <p className="text-xs text-teal-100">Online · Ask me anything</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "assistant" && (
                  <div className="w-7 h-7 bg-[#0E8B8B] rounded-full flex items-center justify-center flex-shrink-0 mr-2 mt-1">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-[#0E8B8B] text-white rounded-tr-sm"
                      : "bg-white text-gray-800 shadow-sm border border-gray-100 rounded-tl-sm"
                  }`}
                >
                  {msg.role === "assistant" ? (
                    <Streamdown>{msg.content}</Streamdown>
                  ) : (
                    msg.content
                  )}
                </div>
              </div>
            ))}

            {sendMutation.isPending && (
              <div className="flex justify-start">
                <div className="w-7 h-7 bg-[#0E8B8B] rounded-full flex items-center justify-center flex-shrink-0 mr-2 mt-1">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm border border-gray-100">
                  <Loader2 className="w-4 h-4 animate-spin text-[#0E8B8B]" />
                </div>
              </div>
            )}

            {/* Suggested prompts when only initial message */}
            {messages.length === 1 && (
              <div className="space-y-2 pt-1">
                {suggestedPrompts.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setInputValue(prompt);
                      const newMessages: ChatMessage[] = [...messages, { role: "user", content: prompt }];
                      setMessages(newMessages);
                      setInputValue("");
                      sendMutation.mutate({ messages: newMessages });
                    }}
                    className="w-full text-left text-xs bg-white border border-[#0E8B8B]/30 text-[#0E8B8B] px-3 py-2 rounded-lg hover:bg-[#0E8B8B]/5 transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t border-gray-100 flex-shrink-0">
            <div className="flex items-end gap-2">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message… (Enter to send)"
                rows={1}
                className="flex-1 resize-none text-sm border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0E8B8B]/30 focus:border-[#0E8B8B] bg-gray-50 max-h-24"
                style={{ minHeight: "38px" }}
              />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim() || sendMutation.isPending}
                className="w-9 h-9 bg-[#0E8B8B] hover:bg-[#0D7B7B] disabled:opacity-40 text-white rounded-xl flex items-center justify-center transition-all active:scale-95 flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#0E8B8B] hover:bg-[#0D7B7B] text-white rounded-full shadow-lg flex items-center justify-center transition-all active:scale-95 hover:scale-105"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>
    </>
  );
}

// ─── Contact Form Component ───────────────────────────────────────────────────

function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  });

  const submitMutation = trpc.contact.submit.useMutation({
    onSuccess: () => {
      toast.success("Message sent! We'll get back to you shortly.");
      setForm({ name: "", email: "", phone: "", company: "", service: "", message: "" });
    },
    onError: (err) => {
      toast.error(err.message || "Failed to send message. Please try again.");
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }
    submitMutation.mutate({
      name: form.name,
      email: form.email,
      phone: form.phone || undefined,
      company: form.company || undefined,
      service: form.service || undefined,
      message: form.message,
    });
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-[#F7FAFC]">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2D3748] mb-2">
            Get In <span className="text-[#0E8B8B]">Touch</span>
          </h2>
          <p className="text-lg text-[#718096] font-medium mb-0.5">联系我们</p>
          <p className="text-[#A0AEC0] font-medium mb-3">Hubungi Kami</p>
          <p className="text-[#718096] max-w-2xl mx-auto">
            Ready to build your workforce? Contact us today and let YAVOREN Services help you find the right talent for your business.
            <span className="block text-sm mt-1">准备建立您的劳动力队伍？立即联系我们，让亚沃伦服务帮您找到适合的人才。</span>
            <span className="block text-xs mt-1 text-[#A0AEC0]">Bersedia membina tenaga kerja anda? Hubungi kami hari ini dan biarkan YAVOREN Services membantu anda.</span>
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-[#2D3748] mb-1">Contact Information</h3>
            <p className="text-[#0E8B8B] text-sm font-medium mb-6">联系方式 · Maklumat Hubungan</p>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-[#0E8B8B] text-white rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#2D3748]">Email · 电邮 · E-mel</p>
                    <a href="mailto:sales@yavoren.com" className="text-[#0E8B8B] hover:underline text-sm">
                       sales@yavoren.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-[#0E8B8B] text-white rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#2D3748]">Phone · 电话 · Telefon</p>
                    <a href="tel:+60111-5556106" className="text-[#718096] text-sm hover:text-[#0E8B8B] transition-colors">+6011-15556106</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-[#0E8B8B] text-white rounded-lg flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#2D3748]">Company · 公司 · Syarikat</p>
                    <p className="text-[#718096] text-sm">YAVOREN Services Sdn. Bhd.</p>
                    <p className="text-[#718096] text-sm">Malaysia</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Chat CTA */}
            <div className="bg-[#0E8B8B] text-white p-6 rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <MessageCircle className="w-6 h-6" />
                <h4 className="font-bold">Need a Quick Answer? · 需要快速解答？ · Perlu Jawapan Segera?</h4>
              </div>
              <p className="text-sm text-teal-100 mb-4">
                Use our AI assistant (bottom-right corner) to get instant answers about our services, industries, and workforce solutions.
              </p>
              <div className="flex items-center gap-2 text-sm font-semibold">
                <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
                Assistant is online
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
            <h3 className="text-xl font-bold text-[#2D3748] mb-1">Send Us a Message</h3>
            <p className="text-[#0E8B8B] text-sm font-medium mb-0.5">发送消息给我们</p>
            <p className="text-[#0E8B8B] text-sm font-medium mb-5 opacity-70">Hantar Mesej Kepada Kami</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#2D3748] mb-1">
                    Full Name · 全名 · Nama Penuh <span className="text-red-500">*</span>
                  </label>
                  <Input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="border-gray-200 focus:border-[#0E8B8B] focus:ring-[#0E8B8B]/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#2D3748] mb-1">
                    Email · 电邮 · E-mel <span className="text-red-500">*</span>
                  </label>
                  <Input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="john@company.com"
                    required
                    className="border-gray-200 focus:border-[#0E8B8B] focus:ring-[#0E8B8B]/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#2D3748] mb-1">Phone · 电话 · Telefon</label>
                  <Input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+60 12 345 6789"
                    className="border-gray-200 focus:border-[#0E8B8B] focus:ring-[#0E8B8B]/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#2D3748] mb-1">Company · 公司 · Syarikat</label>
                  <Input
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="Your Company Sdn. Bhd."
                    className="border-gray-200 focus:border-[#0E8B8B] focus:ring-[#0E8B8B]/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#2D3748] mb-1">Service Interest · 服务类型 · Minat Perkhidmatan</label>
                <select
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0E8B8B]/20 focus:border-[#0E8B8B] bg-white text-gray-700"
                >
                  <option value="">Select a service… · 选择服务 · Pilih perkhidmatan…</option>
                  <option value="Temporary Staffing">Temporary Staffing</option>
                  <option value="Permanent Recruitment">Permanent Recruitment</option>
                  <option value="Skilled Labour Supply">Skilled Labour Supply</option>
                  <option value="Unskilled Labour Supply">Unskilled Labour Supply</option>
                  <option value="Workforce Management">Workforce Management</option>
                  <option value="On-Site Supervision">On-Site Supervision</option>
                  <option value="Training Services">Training Services</option>
                  <option value="Labor Accommodation">Labor Accommodation</option>
                  <option value="General Enquiry">General Enquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#2D3748] mb-1">
                  Message · 留言 · Mesej <span className="text-red-500">*</span>
                </label>
                <Textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us about your workforce requirements…"
                  rows={4}
                  required
                  className="border-gray-200 focus:border-[#0E8B8B] focus:ring-[#0E8B8B]/20 resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={submitMutation.isPending}
                className="w-full bg-[#0E8B8B] hover:bg-[#0D7B7B] text-white font-semibold py-2.5 active:scale-[0.98] transition-all"
              >
                {submitMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    Send Message · 发送 · Hantar
                    <Send className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials Section Component ─────────────────────────────────────────

function TestimonialsSection() {
  // Fetch approved client-submitted testimonials from DB
  const { data: approvedTestimonials = [] } = trpc.testimonials.getApproved.useQuery();

  // Submission form state
  const [tForm, setTForm] = useState({
    name: "",
    role: "",
    company: "",
    industry: "",
    quote: "",
    rating: 5,
  });
  const [hoveredRating, setHoveredRating] = useState(0);
  const [formOpen, setFormOpen] = useState(false);

  const submitTestimonial = trpc.testimonials.submit.useMutation({
    onSuccess: () => {
      toast.success("Thank you! Your testimonial has been submitted for review.");
      setTForm({ name: "", role: "", company: "", industry: "", quote: "", rating: 5 });
      setFormOpen(false);
    },
    onError: (err) => {
      toast.error(err.message || "Failed to submit. Please try again.");
    },
  });

  const handleTChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setTForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleTSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tForm.name.trim() || !tForm.role.trim() || !tForm.company.trim() || !tForm.industry.trim() || !tForm.quote.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }
    submitTestimonial.mutate({
      name: tForm.name,
      role: tForm.role,
      company: tForm.company,
      industry: tForm.industry,
      quote: tForm.quote,
      rating: tForm.rating,
    });
  };

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-white">
      <div className="container">
        {/* Section header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-[#0E8B8B]/10 text-[#0E8B8B] px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Award className="w-4 h-4" />
              CLIENT SUCCESS STORIES · 客户成功案例 · Kisah Kejayaan Pelanggan
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2D3748] mb-2">
              Trusted by <span className="text-[#0E8B8B]">Reputable Clients</span>
            </h2>
            <p className="text-lg text-[#718096] font-medium mb-1">深得知名客户信赖</p>
            <p className="text-[#A0AEC0] font-medium mb-3">Dipercayai Pelanggan Terkemuka</p>
            <p className="text-[#718096] max-w-2xl mx-auto">
              Real results from real partnerships. Here is what our clients say about working with YAVOREN Services.
              <span className="block text-sm mt-1">真实合作的真实成果。这是我们的客户对与亚沃伦服务合作的评价。</span>
              <span className="block text-xs mt-1 text-[#A0AEC0]">Hasil nyata daripada perkongsian sebenar. Inilah kata pelanggan kami tentang bekerjasama dengan YAVOREN Services.</span>
            </p>
        </div>

        {/* ── ELEVATE Audit Achievement Banner ── */}
        <div className="mb-10 bg-gradient-to-r from-[#0E8B8B] to-[#0A6B6B] rounded-2xl p-6 md:p-8 text-white relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Trophy icon */}
            <div className="flex-shrink-0 w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <Award className="w-9 h-9 text-amber-300" />
            </div>
            {/* Text */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="bg-amber-400 text-amber-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Certified Achievement</span>
                <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full">ELEVATE Audit · 审计认证 · Audit ELEVATE</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-1">
                Service Provider to Pass ELEVATE Audit — Zero Major Findings
              </h3>
              <p className="text-teal-100 text-sm mb-0.5">通过 ELEVATE 审计且零重大发现的服务提供商</p>
              <p className="text-teal-200 text-xs mb-3">Pembekal perkhidmatan yang lulus Audit ELEVATE tanpa sebarang penemuan utama</p>
              <p className="text-teal-100 text-sm leading-relaxed">
                YAVOREN Services is a workforce service provider that has successfully managed the ELEVATE Audit with <strong className="text-amber-300">minor findings</strong> — and maintained this standard for <strong className="text-white">4 consecutive years</strong> through exemplary workers’ welfare management.
              </p>
              <p className="text-teal-200 text-xs mt-1">亚沃伦服务连续4年通过 ELEVATE 审计，以卓越的工人福利管理著称。</p>
              <p className="text-teal-300 text-xs mt-0.5">YAVOREN Services berjaya menguruskan Audit ELEVATE selama 4 tahun berturut-turut melalui pengurusan kebajikan pekerja yang cemerlang.</p>
            </div>
            {/* Stats */}
            <div className="flex-shrink-0 grid grid-cols-2 gap-4 text-center">
              <div className="bg-white/15 rounded-xl p-4">
                <div className="text-3xl font-bold text-amber-300">4</div>
                <div className="text-xs text-teal-100 mt-1">Consecutive Years</div>
                <div className="text-xs text-teal-200">连续年份</div>
                <div className="text-xs text-teal-300">Tahun Berturut</div>
              </div>
              <div className="bg-white/15 rounded-xl p-4">
                <div className="text-2xl font-bold text-amber-300">Minor</div>
                <div className="text-xs text-teal-100 mt-1">Findings Only</div>
                <div className="text-xs text-teal-200">仅小问题</div>
                <div className="text-xs text-teal-300">Penemuan Minor</div>
              </div>
            </div>
          </div>
        </div>

        {/* Static featured case studies */}
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-[#F7FAFC] rounded-2xl p-8 flex flex-col gap-6 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
            >
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div className="relative">
                <Quote className="w-8 h-8 text-[#0E8B8B]/20 absolute -top-1 -left-1" />
                <p className="text-[#4A5568] text-sm leading-relaxed pl-6 italic">{t.quote}</p>
              </div>
              <div className="grid grid-cols-3 gap-3 py-4 border-t border-b border-gray-200">
                {t.metrics.map((m, i) => (
                  <div key={i} className="text-center">
                    <div className="text-lg font-bold text-[#0E8B8B]">{m.value}</div>
                    <div className="text-xs text-[#718096] mt-0.5 leading-tight">{m.label}</div>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#0E8B8B] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">{t.author.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-bold text-[#2D3748] text-sm">{t.author}</p>
                  <p className="text-xs text-[#718096]">{t.role} · {t.company}</p>
                </div>
              </div>
              <div className="mt-auto">
                <span className="inline-block bg-[#0E8B8B]/10 text-[#0E8B8B] text-xs font-semibold px-3 py-1 rounded-full">
                  {t.industry}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Approved client-submitted testimonials */}
        {approvedTestimonials.length > 0 && (
          <div className="mb-10">
            <h3 className="text-lg font-bold text-[#2D3748] mb-1 text-center">More From Our Clients</h3>
            <p className="text-center text-[#A0AEC0] text-sm mb-6">Lebih Dari Pelanggan Kami</p>
            <div className="grid md:grid-cols-3 gap-6">
              {approvedTestimonials.map((t) => (
                <div
                  key={t.id}
                  className="bg-[#F7FAFC] rounded-2xl p-6 flex flex-col gap-4 border border-gray-100 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < t.rating ? "fill-amber-400 text-amber-400" : "text-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="relative">
                    <Quote className="w-7 h-7 text-[#0E8B8B]/20 absolute -top-1 -left-1" />
                    <p className="text-[#4A5568] text-sm leading-relaxed pl-5 italic">{t.quote}</p>
                  </div>
                  <div className="flex items-center gap-3 mt-auto">
                    <div className="w-9 h-9 bg-[#0E8B8B] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-xs">{t.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-bold text-[#2D3748] text-sm">{t.name}</p>
                      <p className="text-xs text-[#718096]">{t.role} · {t.company}</p>
                    </div>
                  </div>
                  <span className="inline-block bg-[#0E8B8B]/10 text-[#0E8B8B] text-xs font-semibold px-3 py-1 rounded-full w-fit">
                    {t.industry}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Aggregate stats band */}
        <div className="bg-[#2D3748] rounded-2xl p-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white mb-12">
          {[
            { value: "500+", label: "Workers Successfully Deployed", labelZh: "已成功部署工人", labelMs: "Pekerja Berjaya Dihantar" },
              { value: "8+",   label: "Active Projects", labelZh: "活跃项目", labelMs: "Projek Aktif" },
              { value: "6",    label: "Industries Served", labelZh: "服务行业", labelMs: "Industri Dilayan" },
              { value: "100%", label: "Client Retention Rate", labelZh: "客户留存率", labelMs: "Kadar Pengekalan Pelanggan" },
          ].map((stat, i) => (
            <div key={i}>
              <div className="text-3xl md:text-4xl font-bold text-[#0E8B8B]">{stat.value}</div>
                <div className="text-sm text-gray-300 mt-1">{stat.label}</div>
                <div className="text-xs text-gray-400">{(stat as any).labelZh}</div>
                <div className="text-xs text-gray-500">{(stat as any).labelMs}</div>
            </div>
          ))}
        </div>

        {/* ── Submit a Testimonial ── */}
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-[#2D3748] mb-1">Share Your Experience</h3>
            <p className="text-[#0E8B8B] text-sm font-medium mb-0.5">分享您的体验</p>
            <p className="text-[#0E8B8B] text-sm font-medium mb-2 opacity-70">Kongsi Pengalaman Anda</p>
            <p className="text-[#718096] text-sm">
              Have you worked with YAVOREN Services? We would love to hear from you. Submitted testimonials are reviewed before publication.
              <span className="block text-xs mt-1">您曾与亚沃伦服务合作吗？我们很乐意听取您的意见。提交的评语将在审核后发布。</span>
              <span className="block text-xs mt-1 text-[#A0AEC0]">Pernah bekerjasama dengan YAVOREN Services? Kami ingin mendengar daripada anda. Testimoni yang dihantar akan disemak sebelum diterbitkan.</span>
            </p>
          </div>

          {!formOpen ? (
            <div className="text-center">
              <button
                onClick={() => setFormOpen(true)}
                className="inline-flex items-center gap-2 bg-[#0E8B8B] hover:bg-[#0D7B7B] text-white font-semibold px-6 py-3 rounded-xl transition-all active:scale-[0.98]"
              >
                <Quote className="w-4 h-4" />
                Write a Testimonial · 撰写评语 · Tulis Testimoni
              </button>
            </div>
          ) : (
            <div className="bg-[#F7FAFC] rounded-2xl p-8 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h4 className="font-bold text-[#2D3748]">Your Testimonial</h4>
                <button
                  onClick={() => setFormOpen(false)}
                  className="text-[#718096] hover:text-[#2D3748] transition-colors"
                  aria-label="Close form"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleTSubmit} className="space-y-4">
                {/* Name + Role */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#2D3748] mb-1">
                      Full Name · 全名 · Nama Penuh <span className="text-red-500">*</span>
                    </label>
                    <Input
                      name="name"
                      value={tForm.name}
                      onChange={handleTChange}
                      placeholder="Ahmad bin Ali"
                      required
                      className="border-gray-200 focus:border-[#0E8B8B]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#2D3748] mb-1">
                      Job Title / Role <span className="text-red-500">*</span>
                    </label>
                    <Input
                      name="role"
                      value={tForm.role}
                      onChange={handleTChange}
                      placeholder="Operations Manager"
                      required
                      className="border-gray-200 focus:border-[#0E8B8B]"
                    />
                  </div>
                </div>

                {/* Company + Industry */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#2D3748] mb-1">
                      Company <span className="text-red-500">*</span>
                    </label>
                    <Input
                      name="company"
                      value={tForm.company}
                      onChange={handleTChange}
                      placeholder="Your Company Sdn. Bhd."
                      required
                      className="border-gray-200 focus:border-[#0E8B8B]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#2D3748] mb-1">
                      Industry <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="industry"
                      value={tForm.industry}
                      onChange={handleTChange}
                      required
                      className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0E8B8B]/20 focus:border-[#0E8B8B] bg-white text-gray-700"
                    >
                      <option value="">Select industry…</option>
                      <option>Manufacturing</option>
                      <option>Warehousing &amp; Distribution</option>
                      <option>Logistics &amp; Supply Chain</option>
                      <option>Telecommunications Infrastructure</option>
                      <option>Electronics Manufacturing</option>
                      <option>Commercial Buildings</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                {/* Star Rating */}
                <div>
                  <label className="block text-sm font-semibold text-[#2D3748] mb-2">
                    Your Rating <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setTForm((p) => ({ ...p, rating: star }))}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        className="transition-transform hover:scale-110 active:scale-95"
                        aria-label={`${star} star`}
                      >
                        <Star
                          className={`w-7 h-7 transition-colors ${
                            star <= (hoveredRating || tForm.rating)
                              ? "fill-amber-400 text-amber-400"
                              : "text-gray-300"
                          }`}
                        />
                      </button>
                    ))}
                    <span className="ml-2 text-sm text-[#718096]">
                      {["Poor", "Fair", "Good", "Great", "Excellent"][(hoveredRating || tForm.rating) - 1]}
                    </span>
                  </div>
                </div>

                {/* Testimonial text */}
                <div>
                  <label className="block text-sm font-semibold text-[#2D3748] mb-1">
                    Your Testimonial <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    name="quote"
                    value={tForm.quote}
                    onChange={handleTChange}
                    placeholder="Share your experience working with YAVOREN Services…"
                    rows={4}
                    required
                    className="border-gray-200 focus:border-[#0E8B8B] resize-none"
                  />
                  <p className="text-xs text-[#718096] mt-1">{tForm.quote.length}/1000 characters</p>
                </div>

                <Button
                  type="submit"
                  disabled={submitTestimonial.isPending}
                  className="w-full bg-[#0E8B8B] hover:bg-[#0D7B7B] text-white font-semibold py-2.5 active:scale-[0.98] transition-all"
                >
                  {submitTestimonial.isPending ? (
                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Submitting…</>
                  ) : (
                    <><Send className="w-4 h-4 mr-2" />Submit Testimonial · 提交评语 · Hantar Testimoni</>
                  )}
                </Button>

                <p className="text-xs text-center text-[#718096]">
                  Testimonials are reviewed by our team before being published on this page. · 评语将由我们的团队审核后发布。 · Testimoni akan disemak oleh pasukan kami sebelum diterbitkan.
                </p>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-[#0E8B8B] to-[#0D9B9B] rounded-full flex items-center justify-center">
              <span className="text-white font-bold">Y</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-[#2D3748]">YAVOREN</span>
              <span className="text-xs text-[#0E8B8B] font-semibold">SERVICES</span>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-[#2D3748] hover:text-[#0E8B8B] transition-colors text-sm font-medium">About <span className="text-[#0E8B8B] text-xs">公司 · Syarikat</span></a>
            <a href="#services" className="text-[#2D3748] hover:text-[#0E8B8B] transition-colors text-sm font-medium">Services <span className="text-[#0E8B8B] text-xs">服务 · Perkhidmatan</span></a>
            <a href="#projects" className="text-[#2D3748] hover:text-[#0E8B8B] transition-colors text-sm font-medium">Projects <span className="text-[#0E8B8B] text-xs">项目 · Projek</span></a>
            <a href="#testimonials" className="text-[#2D3748] hover:text-[#0E8B8B] transition-colors text-sm font-medium">Clients <span className="text-[#0E8B8B] text-xs">客户 · Pelanggan</span></a>
            <a href="#contact" className="text-[#2D3748] hover:text-[#0E8B8B] transition-colors text-sm font-medium">Contact <span className="text-[#0E8B8B] text-xs">联系 · Hubungi</span></a>
            <a
              href="#contact"
              className="bg-[#0E8B8B] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#0D7B7B] transition-colors"
            >
              Get a Quote · 请求报价 · Dapatkan Sebutan Harga
            </a>
          </nav>
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setMobileMenuOpen((v) => !v)}
          >
            <Menu className="w-5 h-5 text-[#2D3748]" />
          </button>
        </div>
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3">
            {[
              { id: "about", label: "About", zh: "公司", ms: "Syarikat" },
              { id: "services", label: "Services", zh: "服务", ms: "Perkhidmatan" },
              { id: "projects", label: "Projects", zh: "项目", ms: "Projek" },
              { id: "testimonials", label: "Clients", zh: "客户", ms: "Pelanggan" },
              { id: "contact", label: "Contact", zh: "联系", ms: "Hubungi" },
            ].map(({ id, label, zh, ms }) => (
              <a
                key={id}
                href={`#${id}`}
                className="block text-[#2D3748] hover:text-[#0E8B8B] transition-colors font-medium capitalize py-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                {label} <span className="text-[#0E8B8B] text-xs">{zh} · {ms}</span>
              </a>
            ))}
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-12 md:pb-20 bg-gradient-to-b from-[#F7FAFC] to-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block bg-[#0E8B8B] text-white px-4 py-2 rounded-full text-sm font-semibold">
                WORKFORCE SOLUTIONS <span className="opacity-80 text-xs ml-1">· 劳动力解决方案 · Penyelesaian Tenaga Kerja</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-[#2D3748] leading-tight">
                Your Partner <span className="text-[#0E8B8B]">In Progress</span>
                <span className="block text-2xl md:text-3xl text-[#718096] font-medium mt-2">您值得信赖的发展伙伴</span>
                <span className="block text-xl md:text-2xl text-[#A0AEC0] font-medium mt-1">Rakan Kongsi Kemajuan Anda</span>
              </h1>
              <p className="text-lg text-[#718096] leading-relaxed">
                Delivering reliable, professional, and innovative workforce solutions that create value and build lasting partnerships.
                <span className="block text-base mt-1">提供可靠、专业且创新的劳动力解决方案，创造价值并建立持久合作关系。</span>
                <span className="block text-sm mt-1 text-[#A0AEC0]">Menyampaikan penyelesaian tenaga kerja yang boleh dipercayai, profesional dan inovatif.</span>
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <a
                  href="#contact"
                  className="inline-flex items-center bg-[#0E8B8B] hover:bg-[#0D7B7B] text-white px-6 py-3 rounded-lg font-semibold transition-colors active:scale-[0.98]"
                >
                  Get Started · 立即开始 · Mulakan <ChevronRight className="w-4 h-4 ml-2" />
                </a>
                <a
                  href="#services"
                  className="inline-flex items-center border-2 border-[#0E8B8B] text-[#0E8B8B] hover:bg-[#F7FAFC] px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Our Services · 我们的服务 · Perkhidmatan Kami
                </a>
              </div>
            </div>
            <div className="relative h-96 md:h-full rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663607210190/WmNwsKT5p2CtqWqtQn4i52/hero-handshake-7GZuqGgeorYr6XLak9VfcV.webp"
                alt="Partnership"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E8B8B]/20 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="bg-[#0E8B8B] py-10">
        <div className="container">
          <div className="grid grid-cols-3 gap-8 text-white text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold">500+</div>
              <p className="text-teal-100 text-sm mt-1">Workers Deployed</p>
              <p className="text-teal-200 text-xs">已部署工人</p>
              <p className="text-teal-300 text-xs opacity-80">Pekerja Dihantar</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold">8+</div>
              <p className="text-teal-100 text-sm mt-1">Active Projects</p>
              <p className="text-teal-200 text-xs">活跃项目</p>
              <p className="text-teal-300 text-xs opacity-80">Projek Aktif</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold">6</div>
              <p className="text-teal-100 text-sm mt-1">Industries Served</p>
              <p className="text-teal-200 text-xs">服务行业</p>
              <p className="text-teal-300 text-xs opacity-80">Industri Dilayan</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-[#2D3748]">
                About <span className="text-[#0E8B8B]">Us</span>
                <span className="block text-xl text-[#718096] font-medium mt-1">公司简介</span>
                <span className="block text-lg text-[#A0AEC0] font-medium mt-0.5">Tentang Kami</span>
              </h2>
              <p className="text-[#718096] leading-relaxed">
                Founded in 2022, <strong className="text-[#0E8B8B]">Skill Birds Services</strong> began as a reputable labour supply company, committed to delivering reliable and efficient manpower solutions. Building on a strong foundation and growing client trust, the company evolved into <strong className="text-[#0E8B8B]">Yavoren Services</strong>, expanding its capabilities beyond labour supply to include a wider range of service solutions.
                <span className="block text-sm mt-1">公司于2022年创立，最初以《技鸟服务》为名，致力提供可靠高效的劳动力解决方案。随着业务发展，公司正式更名为《亚沃伦服务》。</span>
                <span className="block text-xs mt-1 text-[#A0AEC0]">Diasaskan pada 2022 sebagai Skill Birds Services, syarikat ini berkembang menjadi Yavoren Services.</span>
              </p>
              <p className="text-[#718096] leading-relaxed">
                Today, the organization operates as <strong className="text-[#0E8B8B]">YAVOREN Services Sdn Bhd</strong>, reflecting its growth, professionalism, and broader vision in the industry. YAVOREN Services specializes in end-to-end workforce solutions, including recruitment, training, and placement for both short-term and long-term assignments.
                <span className="block text-sm mt-1">目前公司以 <strong className="text-[#0E8B8B]">亚沃伦服务有限公司</strong> 名义运营，专注于端到端劳动力解决方案，包括招聘、培训及短期与长期就业安置。</span>
                <span className="block text-xs mt-1 text-[#A0AEC0]">Kini beroperasi sebagai <strong className="text-[#0E8B8B]">YAVOREN Services Sdn Bhd</strong>, pakar dalam penyelesaian tenaga kerja hujung-ke-hujung.</span>
              </p>
              <p className="text-[#718096] leading-relaxed">
                With a focus on quality, consistency, and client satisfaction, YAVOREN Services continues to support businesses across various sectors by providing skilled manpower and dependable service support.
                <span className="block text-sm mt-1">以品质、稳定性和客户满意度为核心，亚沃伦服务持续为各行业企业提供专业劳动力支持。</span>
                <span className="block text-xs mt-1 text-[#A0AEC0]">Dengan fokus kepada kualiti dan kepuasan pelanggan, YAVOREN terus menyokong perniagaan merentas pelbagai sektor.</span>
              </p>
            </div>
            <div className="space-y-6">
              <div className="bg-[#0E8B8B] text-white p-8 rounded-xl">
                <div className="flex items-start gap-4 mb-4">
                  <Target className="w-8 h-8 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">OUR VISION <span className="text-base font-normal opacity-80">· 我们的愿景 · Visi Kami</span></h3>
                    <p className="text-sm leading-relaxed text-teal-50">
                      In line with our founding objectives, SKILL BIRDS pledges to offer our clients the best and competitive services and solution related to local / foreign workers in MALAYSIA. We aspire to be a Centre of excellence, pioneering and applying the best practices in the industry within the boundary of law.
                      <span className="block mt-2 opacity-90">我们致力为客户提供马来西亚本地及外籍劳工的最佳竞争力服务，并在法律框架内引领行业最佳实践。</span>
                      <span className="block mt-1 opacity-75 text-xs">Kami berhasrat menjadi pusat kecemerlangan, memelopori amalan terbaik industri dalam sempadan undang-undang.</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-[#F7FAFC] text-[#2D3748] p-8 rounded-xl border border-gray-100">
                <div className="flex items-start gap-4">
                  <Lightbulb className="w-8 h-8 flex-shrink-0 mt-1 text-[#0E8B8B]" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">OUR MISSION <span className="text-base font-normal text-[#718096]">· 我们的使命 · Misi Kami</span></h3>
                    <p className="text-sm leading-relaxed text-[#718096]">
                      We strive to provide <strong className="text-[#0E8B8B]">innovative & responsive solutions</strong> that exceed the expectations of our clients. We simplify the process for our clients to <strong className="text-[#0E8B8B]">identify & resolve issues</strong> by expediting resolution time frame. We help clients to <strong className="text-[#0E8B8B]">create value</strong> in their businesses through our value-generating services.
                      <span className="block mt-2">我们致力提供超越客户期望的<strong className="text-[#0E8B8B]">创新与快速响应的解决方案</strong>，帮助客户快速<strong className="text-[#0E8B8B]">发现并解决问题</strong>，并通过增值服务帮助客户<strong className="text-[#0E8B8B]">创造价值</strong>。</span>
                      <span className="block mt-1 text-xs">Kami menyediakan <strong className="text-[#0E8B8B]">penyelesaian inovatif &amp; responsif</strong> yang melampaui jangkaan pelanggan dan membantu mereka <strong className="text-[#0E8B8B]">mencipta nilai</strong>.</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 md:py-24 bg-[#F7FAFC]">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2D3748] mb-2">
              Our <span className="text-[#0E8B8B]">Services</span>
            </h2>
            <p className="text-lg text-[#718096] font-medium mb-1">我们的服务</p>
            <p className="text-[#A0AEC0] font-medium mb-3">Perkhidmatan Kami</p>
            <p className="text-[#718096] max-w-2xl mx-auto">
              YAVOREN Services Sdn. Bhd. provides comprehensive workforce solutions designed to meet the diverse needs of businesses across various industries.
              <span className="block text-sm mt-1">亚沃伦服务有限公司提供全面的劳动力解决方案，满足各行业多样化的业务需求。</span>
              <span className="block text-xs mt-1 text-[#A0AEC0]">YAVOREN Services Sdn. Bhd. menyediakan penyelesaian tenaga kerja yang komprehensif untuk pelbagai industri.</span>
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border-l-4 border-[#0E8B8B]"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-[#0E8B8B] text-white p-3 rounded-lg flex-shrink-0">
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#2D3748] mb-0.5">
                      {service.number}. {service.title}
                    </h3>
                    <p className="text-[#0E8B8B] text-xs font-medium mb-0.5">{service.titleZh}</p>
                    <p className="text-[#0E8B8B] text-xs font-medium mb-1 opacity-70">{service.titleMs}</p>
                    <p className="text-[#718096] text-sm">{service.description}</p>
                    <p className="text-[#718096] text-xs mt-0.5">{service.descriptionZh}</p>
                    <p className="text-[#718096] text-xs opacity-80">{service.descriptionMs}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Timeline Section */}
      <section id="projects" className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2D3748] mb-2">
              Years of Experience &amp; <span className="text-[#0E8B8B]">Project History</span>
            </h2>
            <p className="text-lg text-[#718096] font-medium mb-1">多年经验与项目历程</p>
            <p className="text-[#A0AEC0] font-medium mb-2">Pengalaman Bertahun &amp; Sejarah Projek</p>
            <p className="text-[#718096]">Proven Track Record. Trusted by Reputable Clients.</p>
            <p className="text-[#718096] text-sm">卓越业绩，深得知名客户信赖。</p>
            <p className="text-[#A0AEC0] text-xs mt-1">Rekod Prestasi Terbukti. Dipercayai Pelanggan Terkemuka.</p>
          </div>

          <div className="space-y-0">
            {projectMilestones.map((project, index) => (
              <div key={project.id} className="flex gap-6 md:gap-8">
                {/* Timeline Marker */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-14 h-14 bg-[#0E8B8B] text-white rounded-full flex items-center justify-center font-bold text-lg shadow-md">
                    {project.status}
                  </div>
                  {index < projectMilestones.length - 1 && (
                    <div className="w-0.5 flex-1 bg-gradient-to-b from-[#0E8B8B] to-[#A0D8D8] min-h-8 my-2" />
                  )}
                </div>

                {/* Project Card */}
                <div className="flex-1 bg-[#F7FAFC] p-6 rounded-xl mb-4 border border-gray-100 hover:border-[#0E8B8B]/30 transition-colors">
                  <div className="text-xs font-semibold text-[#0E8B8B] mb-1 uppercase tracking-wide">{project.period}</div>
                  <h3 className="text-base font-bold text-[#2D3748] mb-3">{project.title}</h3>
                  <div className="grid sm:grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-[#718096]">Client: </span>
                      <span className="text-[#2D3748] font-semibold">{project.client}</span>
                    </div>
                    <div>
                      <span className="text-[#718096]">End Client: </span>
                      <span className="text-[#2D3748] font-semibold">{project.endClient}</span>
                    </div>
                    {project.locations && (
                      <div className="sm:col-span-2">
                        <span className="text-[#718096]">Locations: </span>
                        {project.locations.map((loc, i) => (
                          <span key={i} className="text-[#2D3748] font-medium">
                            {i > 0 && " · "}
                            {loc}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="mt-3">
                    <span className="inline-block bg-[#0E8B8B] text-white px-3 py-1 rounded-full text-sm font-bold">
                      {project.pax} PAX
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-16 md:py-24 bg-[#F7FAFC]">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2D3748] mb-2">
              Industries We <span className="text-[#0E8B8B]">Serve</span>
            </h2>
            <p className="text-lg text-[#718096] font-medium mb-0.5">我们服务的行业</p>
            <p className="text-[#A0AEC0] font-medium">Industri Yang Kami Layani</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {industries.map((industry, index) => (
              <div
                key={index}
                className="bg-[#0E8B8B] text-white p-6 rounded-xl text-center hover:shadow-lg hover:scale-[1.02] transition-all"
              >
                <div className="flex justify-center mb-3">
                  <div className="bg-white/20 p-3 rounded-full">
                    {industry.icon}
                  </div>
                </div>
                <h3 className="font-bold text-sm md:text-base">{industry.name}</h3>
                <p className="text-teal-100 text-xs mt-0.5">{industry.nameZh}</p>
                <p className="text-teal-200 text-xs opacity-80">{industry.nameMs}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2D3748] mb-2">
              Why <span className="text-[#0E8B8B]">Choose Us?</span>
            </h2>
            <p className="text-lg text-[#718096] font-medium mb-0.5">为何选择我们？</p>
            <p className="text-[#A0AEC0] font-medium">Mengapa Pilih Kami?</p>
          </div>

          {/* Standards */}
          <div className="mb-12 bg-[#F7FAFC] rounded-2xl p-8 border border-gray-100">
            <h3 className="text-xl font-bold text-[#2D3748] mb-6">Our Standards <span className="text-base font-normal text-[#718096]">· 我们的标准 · Piawaian Kami</span></h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { title: "RBA APPROVED", desc: "Manpower Supply in Reputable Clients · 知名客户劳动力供应认证 · Bekalan Tenaga Kerja Pelanggan Terkemuka" },
                { title: "ELAVETE ERSA (Irqa)", desc: "Qualified audit clients · 合格审计客户 · Pelanggan Audit Berkelayakan" },
                { title: "ISO 9001", desc: "Qualified audit client · 质量管理认证 · Pensijilan Pengurusan Kualiti" },
                { title: "JTK Compliant", desc: "Comply JTK audits · 劳工部合规 · Mematuhi Audit JTK" },
              ].map((std, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-[#0E8B8B] text-white rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-[#2D3748] text-sm">{std.title}</p>
                    <p className="text-[#718096] text-xs">{std.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {[
              {
                icon: <Clock className="w-8 h-8" />,
                title: "TIMELY DEPLOYMENT",
                titleZh: "按时部署",
                points: ["On-Time Workforce Delivery · 按时交付劳动力", "Emergency Support · 紧急支援"],
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "QUALITY OF WORKFORCE",
                titleZh: "劳动力素质",
                points: ["Skilled and Verified Workers · 经过验证的技术工人", "Background Checks · 背景审查", "Replacement Guarantee · 更换保证"],
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: "WORK PERFORMANCE",
                titleZh: "工作表现",
                points: ["High Productivity · 高效生产力", "Work Ethics · 诚信工作态度"],
              },
              {
                icon: <Headphones className="w-8 h-8" />,
                title: "CONTINUOUS SUPPORT",
                titleZh: "持续支持",
                points: ["Ongoing Assistance · 持续协助", "Regular Monitoring · 定期监控"],
              },
            ].map((item, i) => (
              <div key={i} className="bg-[#F7FAFC] p-6 rounded-xl text-center border border-gray-100 hover:border-[#0E8B8B]/30 transition-colors">
                <div className="bg-[#0E8B8B] text-white w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                  {item.icon}
                </div>
                <h3 className="font-bold text-[#2D3748] mb-0.5 text-sm">{item.title}</h3>
                <p className="text-[#0E8B8B] text-xs font-medium mb-2">{(item as any).titleZh}</p>
                <ul className="text-xs text-[#718096] space-y-1">
                  {item.points.map((p, j) => (
                    <li key={j}>✓ {p}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Benefits Grid */}
          <div className="bg-[#2D3748] text-white p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-1 text-center">BENEFITS FOR BUSINESSES</h3>
            <p className="text-center text-teal-200 text-sm mb-0.5">企业效益</p>
            <p className="text-center text-teal-300 text-xs mb-8 opacity-80">Manfaat Untuk Perniagaan</p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-3">
                    <div className="bg-[#0E8B8B] p-3 rounded-full">
                      {benefit.icon}
                    </div>
                  </div>
                  <h4 className="font-bold mb-0.5 text-xs">{benefit.title}</h4>
                  <p className="text-teal-300 text-xs mb-0.5">{benefit.titleZh}</p>
                  <p className="text-teal-300 text-xs mb-1 opacity-70">{benefit.titleMs}</p>
                  <p className="text-xs text-gray-300">{benefit.description}</p>
                  <p className="text-xs text-gray-400">{benefit.descriptionZh}</p>
                  <p className="text-xs text-gray-500">{benefit.descriptionMs}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="py-16 md:py-24 bg-[#0E8B8B] text-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Our Commitment</h2>
              <p className="text-teal-100 text-lg mb-1">我们的承诺</p>
              <p className="text-teal-200 text-base mb-6">Komitmen Kami</p>
              <div className="grid grid-cols-2 gap-5">
                {[
                  { icon: <Shield className="w-6 h-6" />, title: "Safety & Compliance", titleZh: "安全与合规" },
                  { icon: <Handshake className="w-6 h-6" />, title: "Client Satisfaction", titleZh: "客户满意度" },
                  { icon: <CheckCircle className="w-6 h-6" />, title: "Quality Service", titleZh: "优质服务" },
                  { icon: <Users className="w-6 h-6" />, title: "Reliable Workforce", titleZh: "可靠劳动力" },
                  { icon: <Clock className="w-6 h-6" />, title: "Timely Deployment", titleZh: "按时部署" },
                  { icon: <TrendingUp className="w-6 h-6" />, title: "Driving Your Business Forward", titleZh: "推动您的业务发展" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="bg-white/20 p-2.5 rounded-lg flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <span className="font-semibold text-sm block">{item.title}</span>
                      <span className="text-teal-200 text-xs">{(item as any).titleZh}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/10 p-8 rounded-2xl border border-white/20">
              <div className="text-5xl text-white/30 font-serif leading-none mb-4">"</div>
              <p className="text-lg leading-relaxed">
                Delivering reliable, compliant and quality workforce solutions that drive your business forward.
              </p>
              <p className="text-base text-teal-100 mt-2">提供可靠、合规且高质量的劳动力解决方案，推动您的业务向前发展。</p>
              <p className="text-sm text-teal-200 mt-1">Menyampaikan penyelesaian tenaga kerja yang boleh dipercayai, patuh dan berkualiti tinggi.</p>
              <div className="mt-6 pt-6 border-t border-white/20">
                <p className="font-bold">YAVOREN SERVICES SDN. BHD.</p>
                <p className="text-sm text-teal-100">YOUR PARTNER IN PROGRESS · 您的发展伙伴 · Rakan Kemajuan Anda</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials / Case Studies Section */}
      <TestimonialsSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <footer className="bg-[#2D3748] text-white py-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-[#0E8B8B] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">Y</span>
                </div>
                <div>
                  <span className="font-bold text-sm">YAVOREN SERVICES</span>
                </div>
              </div>
              <p className="text-gray-400 text-sm">Your trusted partner for comprehensive workforce solutions.</p>
              <p className="text-gray-500 text-xs mt-0.5">您全面劳动力解决方案的信赖伙伴</p>
              <p className="text-gray-600 text-xs mt-0.5">Rakan kongsi dipercayai anda untuk penyelesaian tenaga kerja yang komprehensif.</p>
            </div>
            <div>
              <h4 className="font-bold mb-1 text-sm">Services</h4>
              <p className="text-gray-500 text-xs mb-0.5">服务</p>
              <p className="text-gray-600 text-xs mb-3">Perkhidmatan</p>
              <ul className="text-gray-400 text-sm space-y-2">
                <li><a href="#services" className="hover:text-[#0E8B8B] transition-colors">Temporary Staffing</a></li>
                <li><a href="#services" className="hover:text-[#0E8B8B] transition-colors">Permanent Recruitment</a></li>
                <li><a href="#services" className="hover:text-[#0E8B8B] transition-colors">Skilled Labour Supply</a></li>
                <li><a href="#services" className="hover:text-[#0E8B8B] transition-colors">Training Services</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-1 text-sm">Company</h4>
              <p className="text-gray-500 text-xs mb-0.5">公司</p>
              <p className="text-gray-600 text-xs mb-3">Syarikat</p>
              <ul className="text-gray-400 text-sm space-y-2">
                <li><a href="#about" className="hover:text-[#0E8B8B] transition-colors">About Us</a></li>
                <li><a href="#services" className="hover:text-[#0E8B8B] transition-colors">Our Services</a></li>
                <li><a href="#projects" className="hover:text-[#0E8B8B] transition-colors">Projects</a></li>
                <li><a href="#contact" className="hover:text-[#0E8B8B] transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-1 text-sm">Contact</h4>
              <p className="text-gray-500 text-xs mb-0.5">联系方式</p>
              <p className="text-gray-600 text-xs mb-3">Hubungi Kami</p>
              <div className="space-y-2 text-gray-400 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#0E8B8B]" />
                  <a href="mailto:sales@yavoren.com" className="hover:text-[#0E8B8B] transition-colors">sales@yavoren.com</a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#0E8B8B]" />
                  <a href="tel:+60111-5556106" className="hover:text-[#0E8B8B] transition-colors">+6011-15556106</a>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400 text-sm space-y-1">
            <p>&copy; 2026 YAVOREN SERVICES SDN. BHD. All rights reserved. · 版权所有 · Hak Cipta Terpelihara</p>
            <p className="text-gray-500 text-xs">SSM No. 202501048526 &nbsp;&middot;&nbsp; Registered in Malaysia</p>
          </div>
        </div>
      </footer>

      {/* Floating Chatbot */}
      <ChatbotWidget />

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/601115556106"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="fixed bottom-24 right-5 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-transform hover:scale-110 active:scale-95"
        style={{ backgroundColor: '#25D366' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-7 h-7">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </div>
  );
}
