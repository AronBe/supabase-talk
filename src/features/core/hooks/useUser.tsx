import { Session, User } from '@supabase/supabase-js'
import React, { useEffect, useState, createContext, useContext } from 'react'
import { supabase } from 'features/core/supabase/supabase'

const initialValues = { user: null, session: null }

export const UserContext = createContext<{
  user: User | null
  session: Session | null
}>(initialValues)

export const UserContextProvider: React.FC = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const currentSession = supabase.auth.session()
    setSession(currentSession)
    setUser(currentSession?.user ?? null)
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, updatedSession) => {
        setSession(updatedSession)
        setUser(updatedSession?.user ?? null)
      }
    )

    return () => {
      authListener!.unsubscribe()
    }
  }, [])

  return (
    <UserContext.Provider value={{ session, user }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserContextProvider.')
  }

  return context
}
