"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Home, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/hooks/use-toast"

interface AdminHeaderProps {
  title: string
  backLink?: string
}

export default function AdminHeader({ title, backLink }: AdminHeaderProps) {
  const { logout } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const handleLogout = () => {
    logout()
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    })
    router.push("/")
  }

  return (
    <div className="border-b border-purple-800/30 bg-purple-950/50 backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-4">
          {backLink ? (
            <Link href={backLink} className="text-purple-200 hover:text-white">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          ) : (
            <Link href="/admin/dashboard" className="text-purple-200 hover:text-white">
              <Home className="h-5 w-5" />
            </Link>
          )}
          <h1 className="text-xl font-semibold text-white">{title}</h1>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-purple-200 hover:text-white">
              View Site
            </Button>
          </Link>
          <Button variant="ghost" size="sm" className="text-purple-200 hover:text-white" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  )
}

