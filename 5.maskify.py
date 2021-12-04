
def maskify_mine(cc):
    l = len(cc)
    if l<=4:
        return cc;
    return f'{"#"*(l-4)}{cc[l-4:]}'
    pass

def maskify_others(cc):
    return "#"*(len(cc)-4) + cc[-4:]
