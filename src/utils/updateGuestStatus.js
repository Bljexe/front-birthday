export function saveCurrentGuest(guest) {
  try {
    console.log('Salvando convidado atual:', guest);
    localStorage.setItem('currentGuest', JSON.stringify(guest));
    console.log('Convidado salvo no localStorage');
  } catch (error) {
    console.error('Erro ao salvar convidado:', error);
  }
}

export function getCurrentGuest() {
  try {
    const storedData = localStorage.getItem('currentGuest');
    if (storedData) {
      return JSON.parse(storedData);
    }
    return null;
  } catch (error) {
    console.error('Erro ao obter convidado atual:', error);
    return null;
  }
}

export function updateGuestStatus(guestId, confirmed) {
  try {
    console.log('Atualizando status do convidado:', guestId, 'para:', confirmed);
    
    const storedData = localStorage.getItem('currentGuest');
    let guestData;
    
    if (storedData) {
      guestData = JSON.parse(storedData);
      console.log('Dados do convidado carregados do localStorage:', guestData);
    } else {
      console.error('Dados do convidado não encontrados no localStorage');
      throw new Error('Dados do convidado não encontrados');
    }
    
    if (guestData.id !== guestId) {
      throw new Error('ID do convidado não confere');
    }
    
    guestData.confirmed = confirmed;
    console.log('Status atualizado:', guestData);
    
    localStorage.setItem('currentGuest', JSON.stringify(guestData));
    console.log('Dados salvos no localStorage');
    
    return {
      success: true,
      guest: guestData
    };
  } catch (error) {
    console.error('Erro ao atualizar status do convidado:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

export function redirectToWhatsApp(phoneNumber, message) {
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  
  console.log('Redirecionando para WhatsApp:', whatsappUrl);
  
  window.open(whatsappUrl, '_blank');
}