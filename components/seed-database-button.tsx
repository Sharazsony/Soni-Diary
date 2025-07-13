"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { seedService, authService } from "@/lib/services"
import { Database, Loader2 } from "lucide-react"

export default function SeedDatabaseButton() {
  const [isSeeding, setIsSeeding] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const handleSeed = async () => {
    try {
      setIsSeeding(true)
      setMessage(null)
      
      // First, create the admin user
      const adminResult = await authService.createAdmin()
      
      // Then seed the database with sample data
      const result = await seedService.seedDatabase()
      
      setMessage(`Database seeded successfully! Created admin user: ${adminResult.admin?.username}. Added ${result.seeded.poems} poems, ${result.seeded.movies} movies, ${result.seeded.books} books, and ${result.seeded.personalInfo} personal info items.`)
    } catch (error) {
      setMessage('Failed to seed database. Please check your MongoDB connection.')
      console.error('Seeding error:', error)
    } finally {
      setIsSeeding(false)
    }
  }

  return (
    <div className="p-4 bg-white/10 rounded-lg backdrop-blur-sm">
      <h3 className="text-lg font-semibold text-white mb-2">Database Setup</h3>
      <p className="text-sm text-gray-200 mb-4">
        Click to set up your MongoDB database with admin user (Soniwriter/Sharaz-123) and sample data. This will replace any existing data.
      </p>
      <Button 
        onClick={handleSeed} 
        disabled={isSeeding}
        className="w-full mb-3"
        variant="outline"
      >
        {isSeeding ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Seeding Database...
          </>
        ) : (
          <>
            <Database className="mr-2 h-4 w-4" />
            Seed Database with Sample Data
          </>
        )}
      </Button>
      {message && (
        <div className={`text-sm p-2 rounded ${
          message.includes('Failed') 
            ? 'bg-red-500/20 text-red-200' 
            : 'bg-green-500/20 text-green-200'
        }`}>
          {message}
        </div>
      )}
    </div>
  )
}
