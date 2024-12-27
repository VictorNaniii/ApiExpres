import jwt from 'jsonwebtoken'

// Funcție pentru verificarea token-ului
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (authHeader) {
    const token = authHeader.split(' ')[1] // Extrage token-ul după "Bearer"
    console.log(token) // Debug: afiseaza token-ul in consola

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) {
        console.error('JWT Verification Error:', err.message) // Debug pentru eroare
        return res.status(403).json('Token is not valid!')
      }
      req.user = user // Salvează datele din token
      next() // Continuă către următorul middleware
    })
  } else {
    return res.status(401).json('You are not authenticated!')
  }
}

// Funcție pentru verificarea token-ului și a autorizației
export const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next() // Continuă dacă utilizatorul are permisiuni
    } else {
      res.status(403).json('You are not allowed to do that!')
    }
  })
}
