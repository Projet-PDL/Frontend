export function useDateFormatter() {
  /**
   * Formate une date au format JJ-MM-AAAA
   * @param dateString - Date au format ISO (YYYY-MM-DD) ou autre format valide
   * @returns Date formatée en JJ-MM-AAAA ou la chaîne originale si invalide
   */
  const formatDate = (dateString: string | null | undefined): string => {
    if (!dateString) return ''

    try {
      const date = new Date(dateString)

      // Vérifier si la date est valide
      if (isNaN(date.getTime())) {
        return dateString
      }

      const day = String(date.getDate()).padStart(2, '0')
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const year = date.getFullYear()

      return `${day}-${month}-${year}`
    } catch (error) {
      console.error('Erreur lors du formatage de la date:', error)
      return dateString
    }
  }

  /**
   * Formate une date au format "Mois AAAA" (ex: "Janvier 2024")
   * @param dateString - Date au format ISO (YYYY-MM-DD) ou autre format valide
   * @param locale - Locale pour le nom du mois (défaut: 'fr-FR')
   * @returns Date formatée en "Mois AAAA"
   */
  const formatMonthYear = (
    dateString: string | null | undefined,
    locale: string = 'fr-FR'
  ): string => {
    if (!dateString) return ''

    try {
      const date = new Date(dateString)

      if (isNaN(date.getTime())) {
        return dateString
      }

      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long'
      }

      return date.toLocaleDateString(locale, options)
    } catch (error) {
      console.error('Erreur lors du formatage de la date:', error)
      return dateString
    }
  }

  return {
    formatDate,
    formatMonthYear
  }
}