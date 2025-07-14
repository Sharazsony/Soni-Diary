"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/lib/auth-context"
import type { Poem } from "@/lib/types"
import { poemService } from "@/lib/services"
import AdminHeader from "@/components/admin-header"

export default function AdminPoetry() {
  const [poems, setPoems] = useState<Poem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [openDialog, setOpenDialog] = useState(false)
  const [deleteDialog, setDeleteDialog] = useState(false)
  const [currentPoem, setCurrentPoem] = useState<Poem | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
  })

  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
      return
    }

    // Fetch poems from database
    async function fetchPoems() {
      try {
        const fetchedPoems = await poemService.getAll()
        setPoems(fetchedPoems)
      } catch (error) {
        console.error('Error fetching poems:', error)
        toast({
          title: "Error",
          description: "Failed to load poems",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchPoems()
  }, [isAuthenticated, router, toast])

  // Function to refresh poems data
  const refreshPoems = async () => {
    try {
      const fetchedPoems = await poemService.getAll()
      setPoems(fetchedPoems)
    } catch (error) {
      console.error('Error refreshing poems:', error)
    }
  }

  const savePoems = async (updatedPoems: Poem[]) => {
    setPoems(updatedPoems)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddPoem = () => {
    setCurrentPoem(null)
    setFormData({
      title: "",
      content: "",
      tags: "",
    })
    setOpenDialog(true)
  }

  const handleEditPoem = (poem: Poem) => {
    setCurrentPoem(poem)
    setFormData({
      title: poem.title,
      content: poem.content,
      tags: poem.tags.join(", "),
    })
    setOpenDialog(true)
  }

  const handleDeletePoem = (poem: Poem) => {
    setCurrentPoem(poem)
    setDeleteDialog(true)
  }

  const confirmDelete = async () => {
    if (!currentPoem) return

    try {
      await poemService.delete(currentPoem.id)

      toast({
        title: "Poem deleted",
        description: `"${currentPoem.title}" has been removed from the database.`,
      })
      
      // Refresh data from database
      refreshPoems()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete poem from database",
        variant: "destructive",
      })
    }

    setDeleteDialog(false)
    setCurrentPoem(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const { title, content, tags } = formData
    const tagArray = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean)

    try {
      if (currentPoem) {
        // Edit existing poem in database
        const updatedPoem = await poemService.update(currentPoem.id, {
          title,
          content,
          tags: tagArray
        })
        
        const updatedPoems = poems.map((p) => (p.id === currentPoem.id ? updatedPoem : p))
        setPoems(updatedPoems)

        toast({
          title: "Poem updated",
          description: `"${title}" has been updated in the database.`,
        })
      } else {
        // Add new poem to database
        const newPoem = await poemService.create({
          title,
          content,
          date: new Date().toISOString(),
          tags: tagArray,
        })

        setPoems([...poems, newPoem])

        toast({
          title: "Poem added",
          description: `"${title}" has been added to the database.`,
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: currentPoem ? "Failed to update poem" : "Failed to create poem",
        variant: "destructive",
      })
    }

    setOpenDialog(false)
    refreshPoems()
  }

  if (!isAuthenticated || isLoading) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 to-purple-900">
      <AdminHeader title="Poetry Management" backLink="/admin/dashboard" />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex justify-between">
          <h2 className="text-2xl font-bold text-white">Your Poems</h2>
          <Button onClick={handleAddPoem} className="bg-purple-600 hover:bg-purple-700">
            <Plus className="mr-2 h-4 w-4" />
            Add New Poem
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {poems.map((poem) => (
            <Card key={poem.id} className="bg-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">{poem.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-4 whitespace-pre-line text-purple-100">{poem.content}</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {poem.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-purple-800/50 px-2 py-1 text-xs text-purple-200">
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-purple-200 hover:text-white"
                  onClick={() => handleEditPoem(poem)}
                >
                  <Pencil className="mr-1 h-4 w-4" />
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-300 hover:text-red-200"
                  onClick={() => handleDeletePoem(poem)}
                >
                  <Trash2 className="mr-1 h-4 w-4" />
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Add/Edit Poem Dialog */}
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="bg-purple-950 text-white sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{currentPoem ? "Edit Poem" : "Add New Poem"}</DialogTitle>
              <DialogDescription className="text-purple-300">
                {currentPoem
                  ? "Update your poem details below."
                  : "Fill in the details to add a new poem to your collection."}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title" className="text-purple-200">
                    Title
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="border-purple-700 bg-purple-900/50 text-white"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="content" className="text-purple-200">
                    Content
                  </Label>
                  <Textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    className="min-h-[150px] border-purple-700 bg-purple-900/50 text-white"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="tags" className="text-purple-200">
                    Tags (comma separated)
                  </Label>
                  <Input
                    id="tags"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    className="border-purple-700 bg-purple-900/50 text-white"
                    placeholder="poetry, nature, love"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                  {currentPoem ? "Update Poem" : "Add Poem"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialog} onOpenChange={setDeleteDialog}>
          <DialogContent className="bg-purple-950 text-white sm:max-w-[400px]">
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription className="text-purple-300">
                Are you sure you want to delete "{currentPoem?.title}"? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex gap-2 sm:justify-end">
              <Button
                variant="outline"
                onClick={() => setDeleteDialog(false)}
                className="border-purple-700 text-purple-200 hover:bg-purple-900/50"
              >
                Cancel
              </Button>
              <Button variant="destructive" onClick={confirmDelete}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

