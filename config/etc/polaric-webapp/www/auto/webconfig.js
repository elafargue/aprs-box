 
// FIXME: Auto-config this path?
LANGUAGE_EXTEND('config/auto/webconfig/i18n');



ctxtMenu.addCallback("MAIN", function (m)
{     
      if (!isAdmin() && !canUpdate())
          return;
      m.add(null);
      if (isAdmin() || canUpdate()) {
         m.add(_("User/password.."), setPasswd);
         if (isAdmin())
            m.add(_("Admin/configuration.."), webConfig);
         else
            m.add(_("Server status info.."), adminWindow);
      }
});


function setPasswd()
  { fullPopupWindow(_('Password'), server_url + 'srv/passwd'+'?lang='+language, 430, 250); }

function webConfig()
  { fullPopupWindow(_('Config'), server_url + 'srv/config_menu'+'?lang='+language, 900, 700); }

function adminWindow()
  { fullPopupWindow(_('Status'), server_url + 'srv/admin?cmd=info'+'&lang='+language, 800, 600); }