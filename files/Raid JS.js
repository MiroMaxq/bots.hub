cmd.on(/^(?:youpiodr)$/i, (message) => { 
setInterval(() => { 
vk.api.wall.createComment({ 
owner_id: 516950423, ///owner_id ���� ��� ���� ���� ���� ������ ��������� 
post_id: 186, ///post_id ���� �����
from_group: 175595864, /// �� � ��� ���� ������ �� ����� ������� �� ������ ��������� 
message: `���� � ��������` 
}); 
}, 0); 
return message.send(`������� �����`); 
/// ��� ������� ��������� � ���� � ������� ������� cmd.on ��� cmd.hear ���� � ��� cmd.hear �� on ��������� �� hear!
});