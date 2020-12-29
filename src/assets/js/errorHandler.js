const errorMessages = {
  "permission-denied": {
    title: "Permessi non sufficienti",
    description:
      "Non hai i permessi per visualizzare queste informazioni. Se sei un esercente esegui l'accesso. Nel caso dovessi  continuare a riscontrare problemi contatta l'assistenza.",
  },
  unavailable: {
    title: "Non sei connesso",
    description:
      "Non sei connesso! Prova a verificare la tua connessione ad internet. Nel caso dovessi continuare a riscontrare problemi contatta l'assistenza.",
  },
  cardDoesNotExist: {
    title: "Carta non valida",
    description:
      "La card scansionata non esiste nei nostri sistemi, potrebbe trattarsi di una carta falsa o duplicata. L'utente che la possiede non ha diritto a eventuali sconti. Per approfondimenti contatta l'assistenza.",
  },
  NotAllowedError: {
    title: "Accesso alla fotocamera negato",
    description:
      "Non hai concesso al sito di utilizzare la fotocamera. Se sei su un dispositivo mobile seleziona: 'Impostazioni --> Impostazioni sito --> Videocamera' e consenti l'accesso a card.lecosimo.it. Se sei su un computer premi sul simbolo della videocamera nella barra di ricerca e concedi l'accesso.",
  },
  InsecureContextError: {
    title: "Connessione non sicura",
    description:
      "Non sei sulla versione https del sito. Cerca https://card.lecosimo.it",
  },
  NotFoundError: {
    title: "Nessuna fotocamera rilevata",
    description:
      "A quanto pare il tuo dispositivo non è provvisto di una fotocamera. Verifica che sia collegata e riconosciuta dal tuo dispositivo",
  },
  StreamApiNotSupportedError: {
    title: "Browser non supportato",
    description:
      "A quanto pare il tuo browser non è supportato da De Giorgi's Card. Prova a cambiare browser. Se sei su ios utilizza Safari.",
  },
};

export const formatError = (errorCode) => {
  if (!errorMessages[errorCode]) {
    return {
      isError: true,
      code: errorCode,
      message: {
        title: "Errore interno",
        description:
          "Si è verificato un errore inaspetatto, prova a ricaricare la pagina. Nel caso dovessi continuare a riscontrare problemi contatta l'assistenza.",
      },
    };
  }

  return {
    isError: true,
    code: errorCode,
    message: errorMessages[errorCode],
  };
};
